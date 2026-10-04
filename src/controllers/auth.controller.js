import User from "../models/user.model.js"
import jwt from 'jsonwebtoken'
export const signupController = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;


        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exist" });
        }


        const user = await User.create({ name, email, password, role });

        return res.status(201).json({ message: "User created successfully", user });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
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
        console.log("Login Error:", error);
        return res.status(500).json({
            message: "something went wrong",
            error: error.message
        })
    }
}