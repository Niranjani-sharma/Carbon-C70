

import Model from "../models/model.js";

export const addNewResult = async (req, res) => {
    try {
      const newResult = new Model(req.body);
      const savedResult = await newResult.save();
      res.status(201).json(savedResult);
    } catch (error) {
      console.error("Error adding new result:", error);
      res.status(500).json({ message: "Server error", details: error.message });
    }
  };
  
  export const fetchLastResult = async (req, res) => {
    try {
      const lastResult = await Model.findOne().sort({ createdAt: -1 });
      if (!lastResult) {
        return res.status(404).json({ message: "No results found" });
      }
      res.status(200).json(lastResult);
    } catch (error) {
      console.error("Error fetching last result:", error);
      res.status(500).json({ message: "Server error", details: error.message });
    }
  };
