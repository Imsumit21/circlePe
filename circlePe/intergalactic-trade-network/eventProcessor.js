// eventProcessor.js
const { EventEmitter } = require('events');
const mongoose = require('mongoose');
const Inventory = require('./models/inventory');
const Cargo = require('./models/cargo');
const NotificationService = require('./services/notificationService');

const eventEmitter = new EventEmitter();

eventEmitter.on('tradeCreated', async (trade) => {
  try {
    await updateInventory(trade);
    await notifyUsers(trade, 'Trade Created');
  } catch (error) {
    console.error('Error processing tradeCreated event:', error);
  }
});

eventEmitter.on('cargoUpdated', async (cargo) => {
  try {
    await updateShipmentStatus(cargo);
    await notifyUsers(cargo, 'Cargo Updated');
  } catch (error) {
    console.error('Error processing cargoUpdated event:', error);
  }
});

async function updateInventory(trade) {
  const { buyerId, sellerId, items } = trade;

  // Update seller's inventory
  for (const item of items) {
    await Inventory.updateOne(
      { stationId: sellerId, 'items.itemId': item.itemId },
      { $inc: { 'items.$.quantity': -item.quantity } }
    );
  }

  // Update buyer's inventory
  for (const item of items) {
    await Inventory.updateOne(
      { stationId: buyerId, 'items.itemId': item.itemId },
      { $inc: { 'items.$.quantity': item.quantity } },
      { upsert: true }
    );
  }
}

async function updateShipmentStatus(cargo) {
  const { shipmentId, status } = cargo;

  await Cargo.updateOne(
    { shipmentId },
    { $set: { status, updatedAt: new Date() } }
  );
}

async function notifyUsers(event, eventType) {
  const notification = {
    eventType,
    eventDetails: event,
    timestamp: new Date(),
  };

  await NotificationService.send(notification);
}

module.exports = eventEmitter;
