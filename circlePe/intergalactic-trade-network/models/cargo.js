// models/cargo.js
const mongoose = require('mongoose');

const cargoSchema = new mongoose.Schema({
  shipmentId: String,
  tradeId: String,
  origin: String,
  destination: String,
  status: String,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model('Cargo', cargoSchema);
