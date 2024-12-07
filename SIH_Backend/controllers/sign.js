import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid"; // Import UUID for generating unique userId

export const signIn = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = { id: user.id };
    console.log(payload);
    const token = jwt.sign(payload, "defeat", {
      expiresIn: 604800,
    });

    res.json({ token });
  } catch (err) {
    console.error("Chu", err.message);
    res.status(500).send("Server error");
  }
};

export const signup = async (req, res) => {
  const {
    name,
    email,
    phone,
    city,
    password,
    address, // Ensure address is included
  } = req.body;

  console.log(req.body);

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique userId
    const userId = uuidv4();

    user = new User({
      name,
      email,
      phone,
      city,
      password: hashedPassword,
      userId, // Ensure userId is included
    });

    await user.save();
    // res.status(201).json({ msg: "User created successfully" });
    const payload = { id: user.id };
    console.log(payload);
    const token = jwt.sign(payload, "defeat", {
      expiresIn: 604800,
    });

    res.json({ token, message: "User created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
