const mongoose = require('mongoose');
require('dotenv').config();

// local url
// const mongoURL = process.env.DB_URL_LOCAL
const mongoURL = process.env.DB_URL;

// Connect to the database
mongoose.connect(mongoURL)
  .then(() => {
    console.log("Database is connected 🚀🚀");
  })
  .catch((err) => {
    console.error("Database connection error 😩", err);
  });

const db = mongoose.connection;

// Event listeners for connection events
db.on('connected', () => {
  console.log("Mongoose default connection is open 🚀🚀");
});

db.on('disconnected', () => {
  console.log("Mongoose default connection is disconnected");
});

db.on('error', (err) => {
  console.log("Mongoose default connection has occurred an error 😩", err);
});

module.exports = db;
