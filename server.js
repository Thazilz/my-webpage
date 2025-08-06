const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root@localhost',
  password: '82a346b7,
  database: 'my_first_db'
});

// API route
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;
  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('Form submitted!');
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

