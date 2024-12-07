import express from "express";
import {
  fetchLastTrackingResult,
  addTrackingResult,
  updateTrackingResult,
  getLastFourCompletedSolutions,
  getLastThreeIncompleteSolutions // Make sure this is imported
} from "../controllers/trackingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to fetch the last tracking result
router.get("/last", authMiddleware, fetchLastTrackingResult);

// Route to add a new tracking result
router.post("/add/:id", authMiddleware, addTrackingResult);

// Route to update a tracking result
router.put("/:id", updateTrackingResult);

// Add this new route
router.get("/last-four-completed", authMiddleware, getLastFourCompletedSolutions);

// Add this new route
router.get("/last-three-incomplete", authMiddleware, getLastThreeIncompleteSolutions);

export default router;
