
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/email.js";

// 1. SIGNUP CONTROLLER
export const signupController = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check required fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user in Database
        const user = await User.create({ name, email, password, role });

        // Send Welcome Email
        try {
            await sendEmail({
                email: email,
                subject: "Welcome to our platform!",
                text: `Hello ${name}, thank you for signing up!`,
                html: `<h1>Welcome ${name}!</h1><p>Your account has been created successfully.</p>`
            });
            console.log("Email sent successfully");
        } catch (emailError) {
            console.log("Email sending failed:", emailError);
        }

        // Return Success Response
        return res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// 2. LOGIN CONTROLLER
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(404).json({ message: "Invalid email or password" });
        }

        const userData = {
            name: user.name,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(userData, process.env.JWT_SECRET);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user
        });

    } catch (error) {
        console.log("Login Error:", error);
        return res.status(500).json({ message: error.message });
    }
};