import 'dotenv/config';
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});


export const sendEmail = async ({ email, otp }) => {
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Welcome to my app",
        text: `your otp is ${otp}`,
        html: `Your OTP is ${otp}`
    })
}

