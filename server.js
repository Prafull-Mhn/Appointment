const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Setup Nodemailer
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Use your Gmail account
    pass: process.env.EMAIL_PASS     // Use your app password
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: 'ghc.notify@gmail.com',
    to: 'globalhomeopathicclinictalgram@gmail.com', // Doctor's email where the appointment request will be sent
    subject: 'New Appointment Request',
    text: `Appointment Request:
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Message: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email', error });
    }
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
