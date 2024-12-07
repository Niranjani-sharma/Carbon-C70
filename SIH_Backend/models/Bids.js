import mongoose from "mongoose";

const applicantSchema = new mongoose.Schema({
  date: { type: Date },
  contractorName: { type: String },
  status: { type: Boolean },
  id: { type: String },
  credits: { type: Number },
  city: { type: String }
});

const bidsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  success: { type: Boolean, required: true },
  active: { type: Boolean, required: true },
  carbonCredits: { type: Number, required: true },
  price: { type: Number, required: true },
  applicants: [applicantSchema] // This should be an array of applicantSchema
});

const Bids = mongoose.model("Bids", bidsSchema);

export default Bids;