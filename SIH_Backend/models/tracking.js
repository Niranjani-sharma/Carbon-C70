import mongoose from "mongoose";

// Define the Solution schema
const SolutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  progress: { type: Number, required: true,default: 0 },
  chosen: { type: Boolean, required: true, default: false },
  carbonCredits: { type: Number, required: true },
  description: { type: String, required: true },
  goal: { type: String, required: true },
});

// Define the Tracking schema
const TrackingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AnalysisResult",
      required: true,
    },
    solutions: [SolutionSchema], // Array of solutions
    // New fields
    Afforestation_Impact: { type: Number, default: 0 },
    EV_Impact: { type: Number, default: 0 },
    Methane_Impact: { type: Number, default: 0 },
    Renew_Impact: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Create the Tracking model
const Tracking = mongoose.model("Tracking", TrackingSchema);
export const Solution = mongoose.model("Solution", SolutionSchema);

// Export the Tracking model and utility functions
export default Tracking;

export const findOne = (query) => Tracking.findOne(query);
export const create = (data) => Tracking.create(data);
export const updateOne = (query, update, options = {}) =>
  Tracking.updateOne(query, update, options);
