import express from "express";
import cors from "cors"; 
import connectDB from "./config/db.js";
import inputRoutes from "./routes/inputRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import trackingRoutes from "./routes/trackingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import walletRoutes from "./routes/walletRoutes.js";
import bidsRoutes from "./routes/bidsRoutes.js";
import companyUserRoutes from './routes/companyUserRoutes.js';

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight support for all routes

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging requests (optional)
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/user-inputs", authMiddleware, inputRoutes);
app.use("/api/analysis-results", analysisRoutes);
app.use("/api/tracking-results", (req, res, next) => {
  console.log("Received request for tracking results:", req.method, req.url);
  next();
}, trackingRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/bids', bidsRoutes);
app.use('/api/company', companyUserRoutes);

// Catch-all route
app.use('*', (req, res) => {
  console.log('Unmatched route:', req.method, req.originalUrl);
  res.status(404).send('Route not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
