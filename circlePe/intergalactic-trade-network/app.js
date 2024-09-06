// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const eventEmitter = require('./eventProcessor');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/intergalacticTradeNetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Example route to create a trade
app.post('/api/trades', (req, res) => {
  const trade = req.body;
  // Save trade to database (not implemented here)
  eventEmitter.emit('tradeCreated', trade);
  res.status(201).json(trade);
});

// Example route to update cargo
app.post('/api/cargo', (req, res) => {
  const cargo = req.body;
  // Save cargo to database (not implemented here)
  eventEmitter.emit('cargoUpdated', cargo);
  res.status(201).json(cargo);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
