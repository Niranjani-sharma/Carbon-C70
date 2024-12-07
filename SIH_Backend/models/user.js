import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String }, // Added address field
    password: { type: String, required: true },
    userId: { type: String }, // Ensure userId is included
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
