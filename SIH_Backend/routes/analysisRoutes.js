import express from "express";
import {
  fetchLastFourAnalysisResults,
  addAnalysisResult,
  fetchLastTrackingResult,
} from "../controllers/analysisController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to fetch the last four analysis results
router.get("/last-four", authMiddleware, fetchLastFourAnalysisResults);

// Route to add a new analysis result
router.post("/done", authMiddleware, addAnalysisResult);

// Route to fetch the last tracking result
router.get("/last-tracking", authMiddleware, fetchLastTrackingResult);

export default router;
