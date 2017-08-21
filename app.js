const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const config = require('./config').config;
const routes = require('./routes');

// Add Middleware
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

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

// Use Routes
app.use('/api', routes);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Index Route
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

io.on('connection', function (socket) {
  socket.on('addStockRequest', (stock) => {
    // console.log(stock);
    socket.broadcast.emit('stockAdded', stock);
  });
  socket.on('removeStockRequest', (symbol) => {
    socket.broadcast.emit('stockRemoved', symbol);
  });
});
