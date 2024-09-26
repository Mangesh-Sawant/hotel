const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/hotel';

// Connect to the database
mongoose.connect(mongoURI)
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
