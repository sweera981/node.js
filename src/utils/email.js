import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    PORT: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});


export const sendEmail = async (email) =>
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "welcome to test1234",
        text: "Thanks for joining test1234.",
        html: "<h1>welcome to test1234</h1>",
    });

