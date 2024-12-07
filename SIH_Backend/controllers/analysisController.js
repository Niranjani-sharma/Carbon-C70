import AnalysisResult from "../models/analysisResults.js";
import Tracking from "../models/tracking.js";
import mongoose from "mongoose";

// Fetch the last four analysis results

const fetchLastFourAnalysisResults = async (req, res) => {
  try {
    console.time("fetchLastFourAnalysisResults"); // Start timing the query
    // console.log(req); // Log the request object

    // const userId = req.user.id;

    // console.log("userId", userId);

    const userId = req.user.id; // Fetch userId from request body
    console.log("userId", userId);

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const validUserId = new mongoose.Types.ObjectId(userId);

    const results = await AnalysisResult.find({ userId: validUserId })
      .sort({ createdAt: -1 })
      .limit(4);

    res.status(200).json(results);
    console.timeEnd("fetchLastFourAnalysisResults"); // End timing the query
  } catch (error) {
    console.error("Error fetching analysis results:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

// Add a new analysis result
const addAnalysisResult = async (req, res) => {
  console.log("Adding analysis result");
  try {
    console.log("Request Body:", req.body);
    console.log("User:", req.user);

    // Get userId from the authenticated user
    const userId = req.user.id;

    const {
      co2Emitted,
      co2EmittedMining,
      co2EmittedTransportation,
      co2EmittedOthers,
      co2Sink,
      gap,
      emissionPerCapita,
    } = req.body;

    console.log("userId:", userId);

    // Validate required fields
    if (
      !userId ||
      co2Emitted === undefined ||
      co2EmittedMining === undefined ||
      co2EmittedTransportation === undefined ||
      co2EmittedOthers === undefined ||
      co2Sink === undefined ||
      gap === undefined ||
      emissionPerCapita === undefined
    ) {
      console.log("Validation failed. Missing fields.");
      return res.status(400).json({ message: "All fields are required", missingFields: {
        userId: !userId,
        co2Emitted: co2Emitted === undefined,
        co2EmittedMining: co2EmittedMining === undefined,
        co2EmittedTransportation: co2EmittedTransportation === undefined,
        co2EmittedOthers: co2EmittedOthers === undefined,
        co2Sink: co2Sink === undefined,
        gap: gap === undefined,
        emissionPerCapita: emissionPerCapita === undefined
      }});
    }

    const validUserId = new mongoose.Types.ObjectId(userId);

    const analysisResult = new AnalysisResult({
      userId: validUserId,
      co2Emitted,
      co2EmittedMining,
      co2EmittedTransportation,
      co2EmittedOthers,
      co2Sink,
      gap,
      emissionPerCapita,
    });

    const savedResult = await analysisResult.save();
    console.log("Analysis result saved successfully");
    res.status(201).json(savedResult);
  } catch (error) {
    console.error("Error adding analysis result:", error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

// get last added tracking
const fetchLastTrackingResult = async (req, res) => {
  try {
    const { userId } = req.body;

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
};

export {
  fetchLastFourAnalysisResults,
  addAnalysisResult,
  fetchLastTrackingResult,
};
