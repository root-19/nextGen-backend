const express = require('express');
const db =  require('../database/database');
const transporter = require('../model/email');
const router = express.Router();
require('dotenv').config();

router.post("/send-message", (req, res) => {
    const { sender, subject, content } = req.body;
    const recipient = "wasieacuna@gmail.com"; 
  
    // Insert message into the database (if needed)
    db.query(
      "INSERT INTO messages (sender, recipient, subject, content) VALUES (?, ?, ?, ?)",
      [sender, recipient, subject, content],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
  
      
        const mailOptions = {
          from: "My NextGen App <${process.env.EMAIL_USER}>", 
          to: recipient,
          subject: subject,
          text: `Sender: ${sender}\n\n${content}`,
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) return res.status(500).json({ error: error.message });
  
          global.io.emit("newMessage", { sender, recipient, subject, content });
          res.json({ message: "Message sent successfully!" });
        });
      }
    );
  });
  
  // Get Messages
  router.get("/messages", (req, res) => {
    db.query("SELECT * FROM messages ORDER BY created_at DESC", (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(result);
    });
  });
  
  module.exports = router;