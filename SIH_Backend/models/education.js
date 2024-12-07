import mongoose from 'mongoose';

// Define the Education schema
const EducationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  tag: { type: String, required: true },
  type: { type: String, required: true },
  link: { type: String, required: true },
}, { timestamps: true });

// Export the Education model
export default mongoose.model('Education', EducationSchema);