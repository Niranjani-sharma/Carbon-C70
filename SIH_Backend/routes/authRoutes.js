import express from "express";
import cors from "cors";
import { signIn, signup, getMe } from "../controllers/sign.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

router.post("/signIn", cors(corsOptions), signIn);
router.post("/signup", cors(corsOptions), signup);
router.get("/me", cors(corsOptions), authMiddleware, getMe);

export default router;
