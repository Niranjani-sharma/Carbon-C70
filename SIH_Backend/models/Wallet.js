import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  creditsEarned: { type: Number, required: true, default: 0 },
  creditsRedeem: { type: Number, required: true, default: 0 },
  time: { type: Date, required: true }
});

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;