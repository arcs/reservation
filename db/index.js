const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // this code solves a deprication warning for Mongoose mPromise
mongoose.connect('mongodb://localhost/reservations', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongo DB is running');
});

const reservationSchema = mongoose.Schema({
  propertyId: Number,
  costPerNight: Number,
  reviewCount: Number,
  availableDate: Number,
  reservedDate: Number
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports.Reservation = Reservation;