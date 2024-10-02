// Import necessary dependencies
const express = require("express");  // Express for building the web server
const app = express();  // Initialize the Express application
const mysql = require('mysql2');  // MySQL2 for database connection
const dotenv = require('dotenv');  // dotenv for loading environment variables

// Configure environment variables from .env file
dotenv.config();

// Create a connection object to the MySQL database using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,  // Database host from environment variable
    user: process.env.DB_USERNAME,  // Database username from environment variable
    password: process.env.DB_PASSWORD,  // Database password from environment variable
    database: process.env.DB_NAME  // Database name from environment variable
});

// Route to retrieve all patients
app.get('', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";  // SQL query to fetch patients
    db.query(getPatients, (err, data) => {  // Execute the query
        if (err) {
            return res.status(400).send("Failed to get patients", err);  // Error handling
        }

        res.status(200).send(data);  // Send retrieved data
    });
});

// Route to retrieve all providers
app.get('', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers";  // SQL query to fetch providers
    db.query(getProviders, (err, data) => {  // Execute the query
      if (err) {
        return res.status(500).send('Error retrieving providers');  // Error handling
      } else {
        res.status(200).send(data);  // Send retrieved data
      }
    });
});

// Route to filter patients by first name
app.get('', (req, res) => {
    const getFilter = "SELECT first_name FROM patients";  // SQL query to fetch patients' first names
    db.query(getFilter, (err, data) => {  // Execute the query
        if (err) {
            return res.status(400).send("Failed to get patients firstname");  // Error handling
        }

        res.status(200).send(data);  // Send retrieved data
    });
});

// Route to retrieve all providers by their specialty
app.get('', (req, res) => {
    const getSpecialty = "SELECT provider_specialty FROM providers";  // SQL query to fetch providers' specialties
    db.query(getSpecialty, (err, data) => {  // Execute the query
        if (err) {
            return res.status(400).send("Failed to get provider specialty", err);  // Error handling
        }

        res.status(200).send(data);  // Send retrieved data
    });
});

// Start the server and listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);  // Log a message when the server starts
});
