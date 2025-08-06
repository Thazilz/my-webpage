// Import required packages
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Create an Express app
const app = express();

// Middleware to allow CORS and parse JSON bodies
app.use(cors());
app.use(express.json());

// Setup MySQL connection — replace placeholders with your own data
const db = mysql.createConnection({
  host: 'localhost',
  user: 'thazil',
  password: '82a346b7',
  database: 'my_first_db'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

// POST endpoint to receive data from frontend
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  // SQL query to insert data into the table
  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  
  // Execute query
  db.query(sql, [name, email, message], (err) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error saving data');
    }
    res.send('Data saved successfully!');
  });
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

