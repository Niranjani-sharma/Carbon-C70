import { findOne, create, updateOne } from "../models/tracking.js"; // Ensure create and updateOne are imported
import Tracking from "../models/tracking.js"; // Ensure you have the correct path to your model
import mongoose from "mongoose"; // Import the mongoose module
import User from "../models/user.js";
import { Solution } from "../models/tracking.js";

import analysisResults from "../models/analysisResults.js";
// Fetch the last tracking result
export async function fetchLastTrackingResult(req, res) {
  try {
    console.log("logged user", req.user);
    const userId = req.user.id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const validUserId = new mongoose.Types.ObjectId(userId);

    // Find the most recent tracking result for the given userId
    const lastTrackingResult = await Tracking.findOne({
      userId: validUserId,
    }).sort({ createdAt: -1 });

    if (!lastTrackingResult) {
      return res
        .status(404)
        .json({ message: "No tracking result found for the given userId" });
    }

    res.status(200).json(lastTrackingResult);
  } catch (error) {
    console.error("Error fetching last tracking result:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Add a new tracking result
export async function addTrackingResult(req, res) {
  try {
    const userID = req.body.userId;
    console.log("User ID:", userID);
    const user = await User.findById(userID);
    req.body.userId = user.id;
    const analysisResult = await analysisResults.findById(req.body._id);
    req.body._id = analysisResult.id;

    // Include new fields if they are provided in the request body
    const { Afforestation_Impact, EV_Impact, Methane_Impact, Renew_Impact } = req.body;
    const trackingData = {
      ...req.body,
      Afforestation_Impact: Afforestation_Impact || 0,
      EV_Impact: EV_Impact || 0,
      Methane_Impact: Methane_Impact || 0,
      Renew_Impact: Renew_Impact || 0,
    };

    const newTrackingResult = await create(trackingData);
    res.status(201).json(newTrackingResult);
  } catch (error) {
    console.error("Error adding tracking result:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Update a tracking result
export async function updateTrackingResult(req, res) {
  try {
    const { trackingID, updatedData, solutionID } = req.body;

    console.log("Tracking ID:", trackingID);
    console.log("Updated Data:", updatedData);

    const tracking = await Tracking.findById(trackingID);
    console.log("Tracking:", tracking);

    if (!tracking) {
      return res.status(404).json({ error: "Tracking result not found" });
    }

    // Check if the update is for a solution or for the new impact fields
    if (solutionID) {
      const solutions = tracking.solutions;
      console.log("Solutions:", solutions);

      const reqSolution = solutions.find(
        (solution) => solution._id.toString() === solutionID
      );

      if (!reqSolution) {
        return res.status(404).json({ error: "Solution not found" });
      }

      const setString = `solutions.$.${Object.keys(updatedData)[0]}`;
      const value = Object.values(updatedData)[0];

      console.log("Set String:", setString);
      console.log("Value:", value);
      const updatedResult = await updateOne(
        { _id: trackingID, "solutions._id": solutionID },
        { $set: { [setString]: value } }
      );

      console.log("Update Result:", updatedResult);

      if (updatedResult.matchedCount === 0) {
        return res.status(404).json({ error: "Tracking result not found" });
      }

      res.status(200).json(updatedResult);
    } else {
      // Update the impact fields
      const updatedResult = await updateOne(
        { _id: trackingID },
        { $set: updatedData }
      );

      console.log("Update Result:", updatedResult);

      if (updatedResult.matchedCount === 0) {
        return res.status(404).json({ error: "Tracking result not found" });
      }

      res.status(200).json(updatedResult);
    }
  } catch (error) {
    console.error("Error updating tracking result:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
}

export async function getLastFourCompletedSolutions(req, res) {
  try {
    const userId = req.user.id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const completedSolutions = await Tracking.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $unwind: "$solutions" },
      { $match: { "solutions.progress": 100 } },
      { $sort: { "solutions.updatedAt": -1 } },
      { $limit: 4 },
      {
        $project: {
          _id: 0,
          name: "$solutions.name",
          carbonCredits: "$solutions.carbonCredits"
        }
      }
    ]);

    res.status(200).json(completedSolutions);
  } catch (error) {
    console.error("Error fetching last four completed solutions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getLastThreeIncompleteSolutions(req, res) {
  try {
    const userId = req.user.id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const incompleteSolutions = await Tracking.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $unwind: "$solutions" },
      { $match: { "solutions.progress": { $lt: 100 } } },
      { $sort: { "solutions.updatedAt": -1 } },
      { $limit: 3 },
      {
        $project: {
          _id: 0,
          name: "$solutions.name",
          progress: "$solutions.progress",
          goal: "$solutions.goal",
          description: "$solutions.description"
        }
      }
    ]);

    res.status(200).json(incompleteSolutions);
  } catch (error) {
    console.error("Error fetching last three incomplete solutions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
