// models/inventory.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemId: String,
  quantity: Number,
});

const inventorySchema = new mongoose.Schema({
  stationId: String,
  items: [itemSchema],
  updatedAt: Date,
});

module.exports = mongoose.model('Inventory', inventorySchema);
