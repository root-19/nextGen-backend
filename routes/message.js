const express = require('express');
const transporter = require('../model/email');
const router = express.Router();
require('dotenv').config();

router.post("/send-message", (req, res) => {
    const { sender, subject, content } = req.body;
    const recipient = "wasieacuna@gmail.com"; 

    const mailOptions = {
        from: `My NextGen App <${process.env.EMAIL_USER}>`, 
        to: recipient,
        subject: subject,
        text: `Sender: ${sender}\n\n${content}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).json({ error: error.message });

        global.io.emit("newMessage", { sender, recipient, subject, content });
        res.json({ message: "Message sent successfully!" });
    });
});

module.exports = router;
