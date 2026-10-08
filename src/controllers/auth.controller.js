
import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'
import { sendEmail } from "../utils/email.js"
export const signupController = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;


        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (existingUser.isVerified) {
                return res.status(400).json({ message: "User already exist" });
            }

            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            existingUser.otp = otp;
            await existingUser.save();
            await sendEmail({ email, otp });
            return res.status(200).json({ message: "OTP sent successfully to your email", user: existingUser });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        const user = await User.create({ name, email, password, role, otp });
        await sendEmail({ email, otp });
        return res.status(201).json({ message: "User created successfully", user });

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}
export const verifyOtpController = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        if (user.isVerified) {
            return res.status(400).json({
                message: "user is already verified",
            })
        }

        if (user.otp != otp) {
            return res.status(400).json({
                message: "invalid otp"
            })
        }
        user.isVerified = true;
        user.otp = undefined
        await user.save();

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully",
            user,
        })

    } catch (error) {
        return res.status(500).json({
            message: "internal server error",
            error: error.message,
        })
    }
}



export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(404).json({
                message: "Invalid email or password"
            })
        }
        const userData = {
            name: user.name,
            email: user.email,
            role: user.role
        }


        const token = jwt.sign({ userData }, process.env.JWT_SECRET)
        return res.status(200).json({
            success: true,
            message: "Login successfull",
            token,
            user
        })


    } catch (error) {
        return res.status(500).json({
            message: "something went wrong"
        })
    }
}