// Controllers for the organizer authentication
import OrganizerModel from "../models/organizerModel.js";
import bcrypt from "bcrypt";
import { createJWTToken } from "../utils/JWTServices.js";
import { v4 as uuidv4 } from "uuid";

export const OrganizerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }

    // Check if organizer exists
    const organizer = await OrganizerModel.findOne({ email });

    if (!organizer) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid credentials" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, organizer.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid credentials" });
    }

    // Create JWT token
    const payload = {
      _id: organizer._id,
      email: organizer.email,
    };
    const token = createJWTToken(payload);
    res.status(200).json({
      status: "success",
      message: "Organizer logged in successfully",
      token,
      organizer,
    });
  } catch (error) {
    console.log("error:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

export const OrganizerSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }

    // Validate email that, it should be valid email, verify through regex
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid Email" });
    }

    // Check if organizer exists
    const organizerExists = await OrganizerModel.findOne({ email });

    if (organizerExists) {
      return res
        .status(400)
        .json({ status: "failed", message: "Organizer already exists" });
    }

    // Password validation: Password should be at least 6 characters long and should be contain at least one number, one uppercase letter, one lowercase letter, and one special character
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: "failed",
        message:
          "Password must be a strong passwprd. Password should be at least 6 characters long and should be contain at least one number, one uppercase letter, one lowercase letter, and one special character",
      });
    }

    // Hash password
    const genSalt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, genSalt);

    // Create organizer
    const organizerId = uuidv4();
    const newOrganizer = new OrganizerModel({
      organizerId,
      name,
      email,
      password: hashedPassword,
    });

    await newOrganizer.save();

    const payload = {
      _id: newOrganizer._id,
      email: newOrganizer.email,
    };
    const token = createJWTToken(payload);
    res.status(201).json({
      status: "success",
      message: "Organizer created successfully",
      token,
      organizer: newOrganizer,
    });
  } catch (error) {
    console.log("error:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};
