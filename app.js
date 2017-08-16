const express = require('express');
const app = express();

const config = require('./config').config;

// Add Middleware
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
// const path = require('path');

app.use(bodyparser.json());
app.use(cors());

// Connect To Database
mongoose.connect(config.mongoAddress, { useMongoClient: true });
// On Connection
mongoose.connection.on('connected', () => {
  console.log(`Connected to database on ${config.mongoAddress}`);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log(`Database error: ${err} while trying to connect on ${config.mongoAddress}`);
});

// Add Routes
// const user = require('./routes/user');
// app.use('/api/user', user);

// const bar = require('./routes/bar');
// app.use('/api/bar', bar);

// Set Static Folder
// app.use(express.static(path.join(__dirname, 'public')));

// Index Route
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });

app.get('/', (req, res) => {
  res.send('lalal');
});

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
