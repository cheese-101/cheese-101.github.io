const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create an Express application
const app = express();

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/websiteDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define a schema for emails
const emailSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String
});

// Create an Email model
const Email = mongoose.model('Email', emailSchema);

// Define a route to handle the contact form submission
app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create a new Email instance
  const newEmail = new Email({
    name,
    email,
    subject,
    message
  });

  // Save the email to the database
  newEmail.save()
    .then(() => {
      console.log('Email saved to MongoDB');
      res.status(200).json({ message: 'Email sent successfully' });
    })
    .catch((error) => {
      console.error('Error saving email to MongoDB:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});