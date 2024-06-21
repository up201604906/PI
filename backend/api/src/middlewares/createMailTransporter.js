const nodemailer = require("nodemailer");
require('dotenv').config();

const createMailTransporter = async () => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: 'digi2emailservice@gmail.com', // SERVICE EMAIL
            pass: 'edxz bqyq jqde znxz', // SERVICE PASSWORD
        },
    });

    try {
        await transporter.verify();
        console.log("Email transporter is ready");
        return transporter;
    } catch (error) {
        console.error("Error verifying transporter:", error);
        throw new Error(error);
    }
};

module.exports = { createMailTransporter };