import CompanyUser from '../models/CompanyUser.js';
import bcrypt from 'bcrypt';

// Controller function to create a new Company user
export const createCompanyUser = async (req, res) => {
  try {
    const { email, password, companyName } = req.body;

    // Check if user already exists
    const existingUser = await CompanyUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new company user
    const newCompanyUser = new CompanyUser({
      email,
      password: hashedPassword,
      companyName
    });

    // Save the new user
    await newCompanyUser.save();

    res.status(201).json({ message: 'Company user created successfully', userId: newCompanyUser._id });
  } catch (error) {
    console.error('Error creating company user:', error);
    res.status(500).json({ message: 'Error creating company user', error: error.message });
  }
};