import "../form1.css";
import Ellipse1 from "../assets/images/Ellipse 1.jpg";
import Ellipse3 from "../assets/images/Ellipse 3.jpg";
import { useState } from "react";
import axios from "axios";
import axiosClient from "../axiosClient";
import { analyzeMiningData, postAnalysisResult } from "../assets/calculations";
import { getProductData } from "./Methane";
import { getUserData } from "./Renew";
import { getInventoryData } from "./EV Impact";
import { getOrderData } from "./afforestration";

const getAuthToken = () => {
  const token = localStorage.getItem("authToken");
  console.log("Retrieved token:", token); // Add this line for debugging
  return token;
};

function Form1() {
  const [miningType, setMiningType] = useState("");
  const [miningLocation, setMiningLocation] = useState("");
  const [miningCity, setMiningCity] = useState("");
  const [numberOfMiners, setNumberOfMiners] = useState(0);
  const [numberOfDaysMined, setNumberOfDaysMined] = useState(0);
  const [amountOfCoalExcavated, setAmountOfCoalExcavated] = useState(0);
  const [vehicleType, setVehicleType] = useState("");
  const [distanceTravelled, setDistanceTravelled] = useState(0);
  const [fuelType, setFuelType] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [explosiveType, setExplosiveType] = useState("");
  const [equipmentData, setEquipmentData] = useState([
    { type: "Excavator", quality: "", hoursRun: 0, fuel: "" },
    { type: "Bulldozer", quality: "", hoursRun: 0, fuel: "" },

    { type: "Haul Truck", quality: "", hoursRun: 0, fuel: "" },
    { type: "Drill Rig", quality: "", hoursRun: 0, fuel: "" },
    { type: "Loader", quality: "", hoursRun: 0, fuel: "" },
  ]);
  const [groqResults, setGroqResults] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      miningData: {
        miningType,
        miningLocation,
        miningCity,
        numberOfMiners,
        numberOfDaysMined,
        amountOfCoalExcavated,
      },
      transportation: {
        vehicleType,
        distance: distanceTravelled,
        fuelType,
      },
      other: {
        explosives: explosiveType,
        amount_used: 1000,
      },
      equipments: {
        excavator: equipmentData[0],
        bulldozer: equipmentData[1],
        haulTruck: equipmentData[2],
        drillRig: equipmentData[3],
        loader: equipmentData[4],
      },
    };

    try {
      const analysisResult = analyzeMiningData(data);
      const postedResult = await postAnalysisResult(analysisResult);
      console.log("Analysis result posted:", postedResult);

      const encodingMaps = {
        Mining_Type: { Opencast: 0, Underground: 1 },
        Mining_Location: {
          "Thar Desert": 0,
          "Eastern Himalayas": 1,
          "Western Ghats": 2,
          "Deccan Plateau": 3,
          "Indo-Gangetic Plain": 4,
        },
        Vehicle_Type: {
          SUV: 0,
          "Light Duty Truck": 1,
          "Heavy Duty Truck": 2,
          Van: 3,
        },
        Fuel_Type: {
          Gasoline: 0,
          Diesel: 1,
          Hybrid: 3,
          Electric: 4,
          "Natural Gas": 2,
        },
        Explosive_Type: { "Water Gel": 0, ANFO: 1, Emulsion: 2 },
        Equipment_Quality: { High: 2, Low: 0, Medium: 1, "N/A": -1 },
        Equipment_Type: {
          Excavator: 0,
          Bulldozer: 1,
          "Haul Truck": 2,
          "Drill Rig": 3,
          Loader: 4,
          None: -1,
        },
        Energy_Source: {
          Diesel: 0,
          Electric: 1,
          "Natural Gas": 2,
          Hybrid: 3,
          "N/A": -1,
        },
      };

      const encode = (type, value) => encodingMaps[type][value] ?? -1;

      const encodedData = {
        Mining_Type: encode("Mining_Type", miningType),
        Mining_Location: encode("Mining_Location", miningLocation),
        Vehicle_Type: encode("Vehicle_Type", vehicleType),
        Fuel_Type: encode("Fuel_Type", fuelType),
        Explosive_Type: encode("Explosive_Type", explosiveType),
        Equipment_Quality_Excavator: encode(
          "Equipment_Quality",
          equipmentData[0].quality
        ),
        Equipment_Excavator: encode("Equipment_Type", "Excavator"),
        Hours_Run_Excavator: equipmentData[0].hoursRun,
        Equipment_Quality_Bulldozer: encode(
          "Equipment_Quality",
          equipmentData[1].quality
        ),
        Equipment_Bulldozer: encode("Equipment_Type", "Bulldozer"),
        Hours_Run_Bulldozer: equipmentData[1].hoursRun,
        Energy_Source_Bulldozer: encode("Energy_Source", equipmentData[1].fuel),
        "Equipment_Haul Truck": encode("Equipment_Type", "Haul Truck"),
        "Equipment_Quality_Haul Truck": encode(
          "Equipment_Quality",
          equipmentData[2].quality
        ),
        "Hours_Run_Haul Truck": equipmentData[2].hoursRun,
        "Energy_Source_Haul Truck": encode(
          "Energy_Source",
          equipmentData[2].fuel
        ),
        "Equipment_Drill Rig": encode("Equipment_Type", "Drill Rig"),
        "Equipment_Quality_Drill Rig": encode(
          "Equipment_Quality",
          equipmentData[3].quality
        ),
        "Hours_Run_Drill Rig": equipmentData[3].hoursRun,
        "Energy_Source_Drill Rig": encode(
          "Energy_Source",
          equipmentData[3].fuel
        ),
        Equipment_Loader: encode("Equipment_Type", "Loader"),
        Equipment_Quality_Loader: encode(
          "Equipment_Quality",
          equipmentData[4].quality
        ),
        Hours_Run_Loader: equipmentData[4].hoursRun,
        Energy_Source_Loader: encode("Energy_Source", equipmentData[4].fuel),
        Distance_Travelled: distanceTravelled,
        Number_of_Miners: numberOfMiners,
        Number_of_Days_Mined: numberOfDaysMined,
        Amount_of_Coal_Excavated: amountOfCoalExcavated,
      };

      // Post the encoded data to the prediction route
      const predictionResponse = await axios.post(
        "http://127.0.0.1:5000/predict",
        encodedData
      );
      const predictionResult = predictionResponse.data;

      console.log("Calling Groq functions...");
      // Call Groq functions
      const methaneResult = await getProductData(miningCity);
      console.log("Methane Result in form1:", methaneResult);
      const renewResult = await getUserData(miningCity);
      console.log("Renew Result in form1:", renewResult);
      const evImpactResult = await getInventoryData(miningCity);
      console.log("EV Impact Result in form1:", evImpactResult);
      const afforestrationResult = await getOrderData(miningCity);
      console.log("Afforestration Result in form1:", afforestrationResult);
      setGroqResults({
        methane: methaneResult,
        renew: renewResult,
        evImpact: evImpactResult,
        afforestration: afforestrationResult,
      });

      // Helper function to safely extract number from string
      const extractNumber = (str) => {
        if (!str) return 0;
        const match = str.match(/[-+]?\d*\.?\d+/);
        return match ? parseFloat(match[0]) : 0;
      };

      // Post to tracking schema
      const trackingData = {
        userId: localStorage.getItem("userId"),
        _id: postedResult._id,
        solutions: [
          {
            name: methaneResult.Name,
            goal: methaneResult.Goal,
            description: methaneResult["Short Desc"],
            carbonCredits: extractNumber(
              methaneResult["Estimated Carbon Offset"]
            ),
          },
          {
            name: renewResult.Name,
            goal: renewResult.Goal,
            description: renewResult["Short Desc"],
            carbonCredits: extractNumber(
              renewResult["Estimated Carbon Offset"]
            ),
          },
          {
            name: evImpactResult.Name,
            goal: evImpactResult.Goal,
            description: evImpactResult["Short Desc"],
            carbonCredits: extractNumber(
              evImpactResult["Estimated Carbon Offset"]
            ),
          },
          {
            name: afforestrationResult.Name,
            goal: afforestrationResult.Goal,
            description: afforestrationResult["Short Desc"],
            carbonCredits: extractNumber(
              afforestrationResult["Estimated Carbon Offset"]
            ),
          },
        ],
        Afforestation_Impact: predictionResult.Afforestation_Impact,
        EV_Impact: predictionResult.EV_Impact,
        Methane_Impact: predictionResult.Methane_Impact,
        Renew_Impact: predictionResult.Renew_Impact,
      };

      console.log(
        "Tracking data to be sent:",
        JSON.stringify(trackingData, null, 2)
      );

      const isValidSolution = (solution) => {
        return solution.name && solution.goal && solution.description;
      };

      if (trackingData.solutions.every(isValidSolution)) {
        const token = getAuthToken();
        const trackingResponse = await axios.post(
          `/api/tracking-results/add/${postedResult._id}`,
          trackingData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Tracking data posted:", trackingResponse.data);

        window.location.href = "/TestsResult";
      } else {
        console.error("Invalid solution data:", trackingData.solutions);
        alert(
          "Some required data is missing. Please check your inputs and try again."
        );
        return;
      }
    } catch (error) {
      console.error("Error processing and saving data:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
      // Optionally, show an error message to the user
      alert("An error occurred while saving the data. Please try again.");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const data = {
  //     miningData: {
  //       miningType,
  //       miningLocation,
  //       miningCity,
  //       numberOfMiners,
  //       numberOfDaysMined,
  //       amountOfCoalExcavated,
  //     },
  //     transportation: {
  //       vehicleType,
  //       distance: distanceTravelled,
  //       fuelType,
  //     },
  //     other: {
  //       explosives: explosiveType,
  //       amount_used: 1000,
  //     },
  //     equipments: {
  //       excavator: equipmentData[0],
  //       bulldozer: equipmentData[1],
  //       haulTruck: equipmentData[2],
  //       drillRig: equipmentData[3],
  //       loader: equipmentData[4],
  //     },
  //   };

  //   const analysisResult = analyzeMiningData(data);

  //   const postedResult = await postAnalysisResult(analysisResult);
  //   console.log("Analysis result posted:", postedResult);

  //   // Assuming postedResult._id contains the ID of the posted analysis result
  //   const analysisId = postedResult._id;

  //   const token = getAuthToken();
  //   console.log("Token used for request:", token);

  //   try {
  //     // const analysisResult = analyzeMiningData(data);
  //     // const postedResult = await postAnalysisResult(analysisResult);
  //     // const token = getAuthToken();
  //     // console.log("Analysis result posted:", postedResult);

  //     // // Fetch the last input result
  //     // try {
  //       const response = await axiosClient.get('/api/user-inputs/last');
  //       const lastInputResult = response.data;
  //       console.log("Last input result:", lastInputResult);
  //     // } catch (error) {
  //     //   console.error("Error fetching last input:", error.response ? error.response.data : error.message);
  //     //   // Handle the error appropriately
  //     // }

  //     const encodingMaps = {
  //       Mining_Type: {"Opencast": 0, "Underground": 1},
  //       Mining_Location: {
  //         "Thar Desert": 0,
  //         "Eastern Himalayas": 1,
  //         "Western Ghats": 2,
  //         "Deccan Plateau": 3,
  //         "Indo-Gangetic Plain": 4
  //       },
  //       Vehicle_Type: {"SUV": 0, "Light Duty Truck": 1, "Heavy Duty Truck": 2, "Van": 3},
  //       Fuel_Type: {"Gasoline": 0, "Diesel": 1, "Hybrid": 3, "Electric": 4, "Natural Gas": 2},
  //       Explosive_Type: {"Water Gel": 0, "ANFO": 1, "Emulsion": 2},
  //       Equipment_Quality: {"High": 2, "Low": 0, "Medium": 1, "N/A": -1},
  //       Equipment_Type: {
  //         "Excavator": 0,
  //         "Bulldozer": 1,
  //         "Haul Truck": 2,
  //         "Drill Rig": 3,
  //         "Loader": 4,
  //         "None": -1
  //       },
  //       Energy_Source: {"Diesel": 0, "Electric": 1, "Natural Gas": 2, "Hybrid": 3, "N/A": -1},
  //     };

  //     const encode = (type, value) => encodingMaps[type][value] ?? -1;

  //     // Encode the columnsexc

  //   const encodedData = {
  //     "Mining_Type": encode("Mining_Type", lastInputResult.Mining_Type),
  //     "Mining_Location": encode("Mining_Location", lastInputResult.Mining_Location),
  //     "Vehicle_Type": encode("Vehicle_Type", lastInputResult.Vehicle_Type),
  //     "Fuel_Type": encode("Fuel_Type", lastInputResult.Fuel_Type),
  //     "Explosive_Type": encode("Explosive_Type", lastInputResult.Explosive_Type),
  //     "Equipment_Quality_Excavator": encode("Equipment_Quality", lastInputResult.Equipment_Quality_Excavator),
  //     "Equipment_Excavator": encode("Equipment_Type", "Excavator"),
  //     "Hours_Run_Excavator": lastInputResult.Hours_Run_Excavator,
  //     "Equipment_Quality_Bulldozer": encode("Equipment_Quality", lastInputResult.Equipment_Quality_Bulldozer),
  //     "Equipment_Bulldozer": encode("Equipment_Type", "Bulldozer"),
  //     "Hours_Run_Bulldozer": lastInputResult.Hours_Run_Bulldozer,
  //     "Energy_Source_Bulldozer": encode("Energy_Source", lastInputResult.Energy_Source_Bulldozer),
  //     "Equipment_Haul Truck": encode("Equipment_Type", "Haul Truck"),
  //     "Equipment_Quality_Haul Truck": encode("Equipment_Quality", lastInputResult["Equipment_Quality_Haul Truck"]),
  //     "Hours_Run_Haul Truck": lastInputResult["Hours_Run_Haul Truck"],
  //     "Energy_Source_Haul Truck": encode("Energy_Source", lastInputResult["Energy_Source_Haul Truck"]),
  //     "Equipment_Drill Rig": encode("Equipment_Type", "Drill Rig"),
  //     "Equipment_Quality_Drill Rig": encode("Equipment_Quality", lastInputResult["Equipment_Quality_Drill Rig"]),
  //     "Hours_Run_Drill Rig": lastInputResult["Hours_Run_Drill Rig"],
  //     "Energy_Source_Drill Rig": encode("Energy_Source", lastInputResult["Energy_Source_Drill Rig"]),
  //     "Equipment_Loader": encode("Equipment_Type", "Loader"),
  //     "Equipment_Quality_Loader": encode("Equipment_Quality", lastInputResult.Equipment_Quality_Loader),
  //     "Hours_Run_Loader": lastInputResult.Hours_Run_Loader,
  //     "Energy_Source_Loader": encode("Energy_Source", lastInputResult.Energy_Source_Loader),
  //     "Distance_Travelled": lastInputResult.Distance_Travelled
  //   };

  //     // Post the encoded data to the prediction route
  //     const predictionResponse = await axios.post('http://127.0.0.1:5000/predict', encodedData);
  //     const predictionResult = predictionResponse.data;

  //     // Call Groq functions
  //     const methaneResult = await getProductData(miningCity);
  //     const renewResult = await getUserData(miningCity);
  //     const evImpactResult = await getInventoryData(miningCity);
  //     const afforestrationResult = await getOrderData(miningCity);

  //     setGroqResults({
  //       methane: JSON.parse(methaneResult),
  //       renew: JSON.parse(renewResult),
  //       evImpact: JSON.parse(evImpactResult),
  //       afforestration: JSON.parse(afforestrationResult)
  //     });

  //     // Post to tracking schema
  //     const trackingData = {
  //       serId: localStorage.getItem('userId'), // Assuming the token contains the user ID
  //       _id: postedResult._id, // ID from the analysis result
  //       solutions: [
  //         groqResults.methane,
  //         groqResults.renew,
  //         groqResults.evImpact,
  //         groqResults.afforestration
  //       ],
  //       Afforestation_Impact: predictionResult.Afforestation_Impact,
  //       EV_Impact: predictionResult.EV_Impact,
  //       Methane_Impact: predictionResult.Methane_Impact,
  //       Renew_Impact: predictionResult.Renew_Impact,
  //     };

  //     const token = getAuthToken();
  //     const trackingResponse = await axios.post('/api/tracking-results/add', trackingData, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     });

  //     console.log('Tracking data posted:', trackingResponse.data);

  //     window.location.href = "/AnalysisResults";
  //   } catch (error) {
  //     console.error("Error processing and saving data:", error);
  //   if (error.response) {
  //     console.error("Response data:", error.response.data);
  //     console.error("Response status:", error.response.status);
  //     console.error("Response headers:", error.response.headers);

  //   }
  // };

  const handleEquipmentChange = (index, key, value) => {
    const updatedEquipmentData = [...equipmentData];
    updatedEquipmentData[index][key] = value;
    setEquipmentData(updatedEquipmentData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form_parent_container">
        <div className="form_form_heading">
          <img src={Ellipse1} alt="foto" />
          <span id="form_form_span">C Neutral</span>
        </div>
        <br />
        <br />
        <div className="form_container">
          <br />
          <div className="form_div1">
            <div className="form_subdiv1"></div>
            <span id="form_form_subheading">Mining Data</span>
          </div>
          <br />
          <br />
          <br />
          <div className="form_parent_div2">
            <div className="form_div2">
              <span className="form_subdiv2">
                Mining Type <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <select
                  value={miningType}
                  onChange={(e) => setMiningType(e.target.value)}
                  type="image"
                  id="form_image"
                  alt="Login"
                  src="Polygon 1.jpg"
                >
                  <option value="opencast">opencast</option>
                  <option value="underground">underground</option>
                </select>
              </div>
            </div>
            <div className="form_div2">
              <span className="form_subdiv2">
                Mining Location <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <select
                  value={miningLocation}
                  onChange={(e) => setMiningLocation(e.target.value)}
                  type="image"
                  id="form_image"
                  alt="Login"
                  src="Polygon 1.jpg"
                >
                  <option value="Thar Desert">Thar desert</option>
                  <option value="Eastern Himalayas">Eastern Himalayas</option>
                  <option value="Western Ghats">Western Ghats</option>
                  <option value="Deccan Plateu">Deccan Plateu</option>
                  <option value="Indo-Gangetic Plate">
                    Indo-Gangetic Plate
                  </option>
                </select>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="form_parent_div2">
            <div className="form_div2">
              <span className="form_subdiv2">
                Mining City <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <input
                  type="text"
                  value={miningCity}
                  onChange={(e) => setMiningCity(e.target.value)}
                  form="UserId"
                  id="form_login_text"
                />
              </div>
            </div>
            <div className="form_div2">
              <span className="form_subdiv2">
                Number of Miners <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <input
                  type="number"
                  min="1"
                  value={numberOfMiners}
                  form="UserId"
                  onChange={(e) => setNumberOfMiners(e.target.value)}
                  id="form_login_text"
                />
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="form_parent_div2">
            <div className="form_div2">
              <span className="form_subdiv2">
                Amount of coal Excavated <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <input
                  type="number"
                  min="0"
                  value={amountOfCoalExcavated}
                  onChange={(e) => setAmountOfCoalExcavated(e.target.value)}
                  form="UserId"
                  id="form_login_text"
                />
              </div>
            </div>
            <div className="form_div2">
              <span className="form_subdiv2">
                Number of days mined <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <input
                  type="number"
                  min="1"
                  value={numberOfDaysMined}
                  onChange={(e) => setNumberOfDaysMined(e.target.value)}
                  form="UserId"
                  id="form_login_text"
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="form_container">
          <br />
          <div className="form_div1">
            <div className="form_subdiv1"></div>
            <span id="form_form_subheading">Transportation</span>
          </div>
          <br />
          <br />
          <br />
          <div className="form_parent_div2">
            <div className="form_div2">
              <span className="form_subdiv2">
                Vehicle Type <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <select
                  type="image"
                  id="form_image"
                  alt="Login"
                  src="Polygon 1.jpg"
                >
                  {" "}
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  <option value="SUV">SUV</option>
                  <option value="light duty">light duty</option>
                  <option value="heavy duty">heavy duty</option>
                  <option value="van">van</option>
                </select>
              </div>
            </div>
            <div className="form_div2">
              <span className="form_subdiv2">
                Fuel Type<span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <select
                  type="image"
                  id="form_image"
                  alt="Login"
                  src="Polygon 1.jpg"
                >
                  {" "}
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="form_parent_div2">
            <div className="form_div2">
              <span className="form_subdiv2">
                Explosives <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <select
                  type="image"
                  id="form_image"
                  alt="Login"
                  src="Polygon 1.jpg"
                >
                  {" "}
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  <option value="Gasoline">Gasoline</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
            <div className="form_div2">
              <span className="form_subdiv2">
                Distance(in kms) <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <input
                  type="number"
                  min="1"
                  value={distanceTravelled}
                  onChange={(e) => setDistanceTravelled(e.target.value)}
                  form="UserId"
                  id="form_login_text"
                />
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
        <br />
        <br />
        <br />
        <div className="form_container">
          <br />
          <div className="form_div1">
            <div className="form_subdiv1"></div>
            <span id="form_form_subheading">Equipments</span>
          </div>
          <br />
          <br />
          <span className="form_form_subheading">Excavator</span>
          <br />
          <br />
          <div className="form_parent_div2">
            <div className="form_div2">
              <span className="form_subdiv2">
                Quality <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <select
                  value={equipmentData[0].quality}
                  onChange={(e) =>
                    handleEquipmentChange(0, "quality", e.target.value)
                  }
                  type="image"
                  id="form_image"
                  alt="Login"
                  src="Polygon 1.jpg"
                >
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                </select>
              </div>
            </div>
            <div className="form_div2">
              <span className="form_subdiv2">
                Fuel <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <select
                  value={equipmentData[0].fuel}
                  onChange={(e) =>
                    handleEquipmentChange(0, "fuel", e.target.value)
                  }
                  type="image"
                  id="form_image"
                  alt="Login"
                  src="Polygon 1.jpg"
                >
                  <option value="Natural Gas">Natural Gas</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="form_parent_div2">
            <div className="form_div2">
              <span className="form_subdiv2">
                Hours run <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <input
                  type="number"
                  min="0"
                  form="UserId"
                  id="form_login_text"
                  value={equipmentData[0].hoursRun}
                  onChange={(e) =>
                    handleEquipmentChange(0, "hoursRun", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <br />
          <br />
          <span className="form_form_subheading">Bulldozer</span>
          <br />
          <br />
          <div className="form_parent_div2">
            <div className="form_div2">
              <span className="form_subdiv2">
                Quality <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <select
                  type="image"
                  id="image"
                  alt="Login"
                  src="Polygon 1.jpg"
                  value={equipmentData[1].hoursRun}
                  onChange={(e) =>
                    handleEquipmentChange(1, "quality", e.target.value)
                  }
                >
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                </select>
              </div>
            </div>
            <div className="form_div2">
              <span className="form_subdiv2">
                Fuel <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <select
                  type="image"
                  id="image"
                  alt="Login"
                  src="Polygon 1.jpg"
                  value={equipmentData[1].fuel}
                  onChange={(e) =>
                    handleEquipmentChange(1, "fuel", e.target.value)
                  }
                >
                  <option value="Natural Gas">Natural Gas</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="form_parent_div2">
            <div className="form_div2">
              <span className="form_subdiv2">
                Hours run <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <input
                  type="number"
                  min="0"
                  form="UserId"
                  id="login_text"
                  value={equipmentData[1].hoursRun}
                  onChange={(e) =>
                    handleEquipmentChange(1, "quality", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <br />
          <br />
          <span className="form_form_subheading">Haul Truck</span>
          <br />
          <br />
          <div className="form_parent_div2">
            <div className="form_div2">
              <span className="form_subdiv2">
                Quality <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <select
                  value={equipmentData[2].quality}
                  onChange={(e) =>
                    handleEquipmentChange(2, "quality", e.target.value)
                  }
                  type="image"
                  id="form_image"
                  alt="Login"
                  src="Polygon 1.jpg"
                >
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                </select>
              </div>
            </div>
            <div className="form_div2">
              <span className="form_subdiv2">
                Fuel <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <select
                  value={equipmentData[2].fuel}
                  onChange={(e) =>
                    handleEquipmentChange(2, "fuel", e.target.value)
                  }
                  type="image"
                  id="form_image"
                  alt="Login"
                  src="Polygon 1.jpg"
                >
                  <option value="Natural Gas">Natural Gas</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="form_parent_div2">
            <div className="form_div2">
              <span className="form_subdiv2">
                Hours run <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <input
                  type="number"
                  min="0"
                  form="UserId"
                  id="form_login_text"
                  value={equipmentData[2].hoursRun}
                  onChange={(e) =>
                    handleEquipmentChange(2, "hoursRun", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <br />
          <br />
          <span className="form_form_subheading">Dill Rig</span>
          <br />
          <br />
          <div className="form_parent_div2">
            <div className="form_div2">
              <span className="form_subdiv2">
                Quality <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <select
                  value={equipmentData[3].quality}
                  onChange={(e) =>
                    handleEquipmentChange(3, "quality", e.target.value)
                  }
                  type="image"
                  id="form_image"
                  alt="Login"
                  src="Polygon 1.jpg"
                >
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                </select>
              </div>
            </div>
            <div className="form_div2">
              <span className="form_subdiv2">
                Fuel <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <select
                  value={equipmentData[3].fuel}
                  onChange={(e) =>
                    handleEquipmentChange(3, "fuel", e.target.value)
                  }
                  type="image"
                  id="form_image"
                  alt="Login"
                  src="Polygon 1.jpg"
                >
                  <option value="Natural Gas">Natural Gas</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="form_parent_div2">
            <div className="form_div2">
              <span className="form_subdiv2">
                Hours run <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <input
                  type="number"
                  min="0"
                  form="UserId"
                  id="form_login_text"
                  value={equipmentData[3].hoursRun}
                  onChange={(e) =>
                    handleEquipmentChange(3, "hoursRun", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <br />
          <br />
          <span className="form_form_subheading">Loader</span>
          <br />
          <br />
          <div className="form_parent_div2">
            <div className="form_div2">
              <span className="form_subdiv2">
                Quality <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <select
                  value={equipmentData[4].quality}
                  onChange={(e) =>
                    handleEquipmentChange(4, "quality", e.target.value)
                  }
                  type="image"
                  id="form_image"
                  alt="Login"
                  src="Polygon 1.jpg"
                >
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                </select>
              </div>
            </div>
            <div className="form_div2">
              <span className="form_subdiv2">
                Fuel <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <select
                  value={equipmentData[4].fuel}
                  onChange={(e) =>
                    handleEquipmentChange(4, "fuel", e.target.value)
                  }
                  type="image"
                  id="form_image"
                  alt="Login"
                  src="Polygon 1.jpg"
                >
                  <option value="Natural Gas">Natural Gas</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="form_parent_div2">
            <div className="form_div2">
              <span className="form_subdiv2">
                Hours run <span id="form_asterisk">* </span>
                <img src={Ellipse3} alt="foto" height="15px" width="15px" />
              </span>
              <div className="form_login_subdiv2">
                <input
                  type="number"
                  min="0"
                  form="UserId"
                  id="form_login_text"
                  value={equipmentData[4].hoursRun}
                  onChange={(e) =>
                    handleEquipmentChange(4, "hoursRun", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <span
            className="form_treatmentPlanner_main_button"
            onClick={handleSubmit}
          >
            <a>Submit</a>
          </span>
          <br />
          <br />
        </div>
      </div>
    </form>
  );
}
export default Form1;
