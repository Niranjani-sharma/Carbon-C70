import UserInput from "../models/inputForm.js";

// Create a new User Input
export const createUserInput = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from URL parameters
    console.log("User ID:", userId);
    console.log(req.body);

    // Create a new object with userId and the rest of the request body
    const inputData = {
      userId,
      ...req.body
    };

    const userInput = new UserInput(inputData);
    const savedUserInput = await userInput.save();
    res.status(201).json(savedUserInput);
  } catch (error) {
    console.error("Error saving user input:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get the newly added User Input by ID
export const getUserInputById = async (req, res) => {
  try {
    const userInput = await UserInput.findById(req.params.id);
    if (!userInput) {
      return res.status(404).json({ error: "User Input not found" });
    }
    res.status(200).json(userInput);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get the last User Input for a specific user
export const getLastUserInput = async (req, res) => {
  try {
    console.log("req.user:", req.user); // Add this line
    const userId = req.user._id; // Get userId from the authenticated user
    console.log("userId:", userId); // Add this line
    
    const lastUserInput = await UserInput.findOne({ userId })
      .sort({ createdAt: -1 })
      .limit(1);

    console.log("lastUserInput:", lastUserInput); // Add this line

    if (!lastUserInput) {
      return res.status(404).json({ error: "No user input found for this user" });
    }

    res.status(200).json(lastUserInput);
  } catch (error) {
    console.error("Error fetching last user input:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
