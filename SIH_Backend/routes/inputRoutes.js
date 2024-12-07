import express from "express";
import {
  createUserInput,
  getUserInputById,
  getLastUserInput,
} from "../controllers/inputController.js";
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to create a new user input
router.post("/carbon/:userId", createUserInput);

// New route to get the last user input (move this before the :id route)
router.get("/last", authMiddleware, getLastUserInput);

// Route to get a user input by ID
router.get("/:id", getUserInputById);

export default router;
