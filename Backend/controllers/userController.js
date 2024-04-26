import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createJWTToken } from "../utils/JWTServices.js";
import { v4 as uuidv4 } from "uuid";

export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }

    // Check if user exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid credentials" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid credentials" });
    }

    // Create JWT token
    const payload = {
      _id: user._id,
      email: user.email,
    };
    const token = createJWTToken(payload);
    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.log("error:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};

export const UserSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }

    // Validate email that it should be valid email, verify through regex
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid Email" });
    }

    // Check if user already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ status: "failed", message: "User already exists" });
    }

    //   Password validation: Password should be at least 6 characters long and should be contain at least one number, one uppercase letter, one lowercase letter, and one special character
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        status: "failed",
        message:
          "Password must be a strong passwprd. Password should be at least 6 characters long and should be contain at least one number, one uppercase letter, one lowercase letter, and one special character",
      });
    }

    // Before creating new user, hash the password for user security
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const userId = uuidv4();
    const newUser = await UserModel.create({
      userId,
      name,
      email,
      password: hashedPassword,
    });
    newUser.save();

    // Now create JWT token for secure user authentication
    //   First create payload which contains user id and email
    const payload = {
      _id: newUser._id,
      email: newUser.email,
    };
    const token = createJWTToken(payload);
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    console.log("error:", error);
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};
