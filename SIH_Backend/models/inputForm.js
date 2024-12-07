import mongoose from "mongoose";

// Define sub-schemas for different sections

// Mining Data Schema
const MiningDataSchema = new mongoose.Schema({
  miningType: {
    type: String,
    enum: ["opencast", "underground"],
  },
  miningLocation: {
    type: String,
    enum: [
      "Thar Desert",
      "Eastern Himalayas",
      "Western Ghats",
      "Deccan Plateau",
      "Indo-Gangetic Plain",
    ],
    required: true,
  },
  miningCity: { type: String },
  numberOfMiners: { type: Number },
  numberOfDaysMined: { type: Number },
  amountOfCoalExcavated: { type: Number },
});

// Transportation Schema
const TransportationSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    enum: ["SUV", "Light Duty", "Heavy Duty", "Van", ""],
  },
  distance: { type: Number },
  fuelType: {
    type: String,
    enum: ["Gasoline", "Diesel", "Hybrid", "Electric", ""],
  },
});

// Other Schema
const OtherSchema = new mongoose.Schema({
  explosives: {
    type: String,
    enum: ["Water Gel", "ANFO", "Emulsion", ""],
  },
  amount_used: { type: Number },
});

// Equipment Sub-schema
const EquipmentSchema = new mongoose.Schema({
  hoursRun: { type: Number },
  quality: { type: String, enum: ["High", "Low", "Medium", ""] },
  fuel: {
    type: String,
    enum: ["Diesel", "Electric", "Natural Gas", "Hybrid", ""],
  },
});

// Equipments Schema
const EquipmentsSchema = new mongoose.Schema({
  excavator: EquipmentSchema,
  bulldozer: EquipmentSchema,
  haulTruck: EquipmentSchema,
  drillRig: EquipmentSchema,
  loader: EquipmentSchema,
});

// Main User Input Schema
const UserInputSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    miningData: MiningDataSchema,
    transportation: TransportationSchema,
    other: OtherSchema,
    equipments: EquipmentsSchema,
  },
  { timestamps: true }
);

// Export the User Input model
export default mongoose.model("UserInput", UserInputSchema);
