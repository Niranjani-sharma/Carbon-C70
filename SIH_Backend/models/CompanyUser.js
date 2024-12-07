import mongoose from "mongoose";

const companyUserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true }
});

const CompanyUser = mongoose.model("CompanyUser", companyUserSchema);

export default CompanyUser;