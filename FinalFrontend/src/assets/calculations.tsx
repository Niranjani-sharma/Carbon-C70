import React from "react";
import axiosClient from "../axiosClient";

// Encodings
const VEHICLE_TYPE = {
  SUV: 0,
  "Light Duty Truck": 1,
  "Heavy Duty Truck": 2,
  Van: 3,
};
const VEHICLE_FUEL_TYPE = {
  Gasoline: 0,
  Diesel: 1,
  "Natural Gas": 2,
  Hybrid: 3,
  Electric: 4,
};
const EXPLOSIVE_TYPE = { WaterGel: 0, ANFO: 1, Emulsion: 2 };
const EQUIPMENT_TYPE = {
  Excavator: 0,
  Bulldozer: 1,
  HaulTruck: 2,
  DrillRig: 3,
  Loader: 4,
};
const EQUIPMENT_FUEL_TYPE = {
  Diesel: 0,
  Electric: 1,
  "Natural Gas": 2,
  Hybrid: 3,
  "N/A": 4,
};
const EQUIPMENT_QUALITY = { Low: 0, Medium: 1, High: 2 };

// Quality Multiplier: Low -> 1.2, Medium -> 1.0, High -> 0.8
const QUALITY_MULTIPLIER = [1.2, 1.0, 0.8];

// Improved CO2 Emission Factors (tons CO₂ per unit)
const CO2_EMISSION_FACTORS = {
  equipment: {
    Excavator: 2.0,
    Bulldozer: 2.5,
    HaulTruck: 3.0,
    DrillRig: 1.8,
    Loader: 2.2,
  },
  vehicle: {
    SUV: 0.25,
    "Light Duty Truck": 0.3,
    "Heavy Duty Truck": 0.4,
    Van: 0.35,
  },
  explosive: {
    WaterGel: 1.8,
    ANFO: 2.2,
    Emulsion: 2.0,
  },
  fuel: {
    Gasoline: 2.3,
    Diesel: 2.7,
    "Natural Gas": 2.0,
    Hybrid: 1.5,
    Electric: 0.0,
  },
};

// Improved function to calculate total CO2 emissions
const calculateTotalCO2 = (data) => {
  console.log("Calculating CO2 for:", data);
  let co2EmittedMining = 0;
  let co2EmittedTransportation = 0;
  let co2EmittedOthers = 0;

  // Calculate emissions from equipment
  Object.values(data.equipments).forEach((equipment) => {
    const baseEmission =
      CO2_EMISSION_FACTORS.equipment[equipment.type] *
      parseFloat(equipment.hoursRun || 0);
    const fuelEmission =
      CO2_EMISSION_FACTORS.fuel[equipment.fuel] *
      parseFloat(equipment.hoursRun || 0);
    const qualityMultiplier =
      QUALITY_MULTIPLIER[EQUIPMENT_QUALITY[equipment.quality]] || 1;
    co2EmittedMining += (baseEmission + fuelEmission) * qualityMultiplier;
  });

  // Calculate emissions from transportation
  const vehicleEmission =
    CO2_EMISSION_FACTORS.vehicle[data.transportation.vehicleType] *
    parseFloat(data.transportation.distance || 0);
  const fuelEmission =
    CO2_EMISSION_FACTORS.fuel[data.transportation.fuelType] *
    parseFloat(data.transportation.distance || 0);
  co2EmittedTransportation = vehicleEmission + fuelEmission;

  // Calculate emissions from explosives
  co2EmittedOthers =
    CO2_EMISSION_FACTORS.explosive[data.other.explosives] *
    parseFloat(data.other.amount_used || 0);

  const totalCO2 =
    co2EmittedMining + co2EmittedTransportation + co2EmittedOthers;

  return {
    co2Emitted: totalCO2,
    co2EmittedMining,
    co2EmittedTransportation,
    co2EmittedOthers,
  };
};

// Predefined Database of Coal Mine Locations with Carbon Sink Values (tons per 100 sq km)
const COAL_MINE_LOCATIONS = [
  { name: "West Valley Coal Mine", carbonSink: 5000 },
  { name: "East Ridge Coal Mine", carbonSink: 4500 },
  { name: "North Peak Coal Mine", carbonSink: 6000 },
  { name: "South Hill Coal Mine", carbonSink: 5500 },
  // Add more predefined locations as needed
];

// Default Carbon Sink Value for 'Other' Locations
const DEFAULT_CARBON_SINK = 4000; // tons per 100 sq km

// Function to calculate carbon sink
const calculateCarbonSink = (location) => {
  const foundLocation = COAL_MINE_LOCATIONS.find(
    (loc) => loc.name === location
  );
  return foundLocation ? foundLocation.carbonSink : DEFAULT_CARBON_SINK;
};

// Updated analyzeMiningData function
export const analyzeMiningData = (data) => {
  console.log("Received data:", data);
  // Ensure all numeric values are properly converted from strings
  const numberOfMiners = parseInt(data.miningData.numberOfMiners) || 0;
  const amountOfCoalExcavated =
    parseFloat(data.miningData.amountOfCoalExcavated) || 0;

  const co2Results = calculateTotalCO2(data);
  const co2Sink = calculateCarbonSink(data.miningData.miningLocation);

  // Ensure we're not dividing by zero
  const gap = co2Results.co2Emitted - co2Sink;
  const emissionPerCapita = numberOfMiners > 0 ? gap / numberOfMiners : 0;
  const emissionPerTonCoal =
    amountOfCoalExcavated > 0 ? gap / amountOfCoalExcavated : 0;

  return {
    co2Emitted: co2Results.co2Emitted || 0,
    co2EmittedMining: co2Results.co2EmittedMining || 0,
    co2EmittedTransportation: co2Results.co2EmittedTransportation || 0,
    co2EmittedOthers: co2Results.co2EmittedOthers || 0,
    co2Sink: co2Sink || 0,
    gap: gap || 0,
    emissionPerCapita: emissionPerCapita || 0,
    emissionPerTonCoal: emissionPerTonCoal || 0,
    miningType: data.miningData.miningType,
    miningLocation: data.miningData.miningLocation,
    miningCity: data.miningData.miningCity,
    numberOfMiners: numberOfMiners,
    numberOfDaysMined: parseInt(data.miningData.numberOfDaysMined) || 0,
    amountOfCoalExcavated: amountOfCoalExcavated,
  };
};

// Updated postAnalysisResult function
export const postAnalysisResult = async (analysisResult, userId) => {
  try {
    const response = await axiosClient.post("/api/analysis-results/done", {
      co2Emitted: analysisResult.co2Emitted,
      co2EmittedMining: analysisResult.co2EmittedMining,
      co2EmittedTransportation: analysisResult.co2EmittedTransportation,
      co2EmittedOthers: analysisResult.co2EmittedOthers,
      co2Sink: analysisResult.co2Sink,
      gap: analysisResult.gap,
      emissionPerCapita: analysisResult.emissionPerCapita,
    });
    return response.data;
  } catch (error) {
    console.error("Error posting analysis result:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    throw error;
  }
};

export { calculateTotalCO2, calculateCarbonSink };
