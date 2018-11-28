const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // this code solves a deprication warning for Mongoose mPromise
// mongoose.connect('mongodb://localhost:27017/reservation', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://mtiosejo:Philippe829!@fec1-iino1.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongo DB is running'));

const reservationSchema = mongoose.Schema({
  propertyid: Number,
  costpernight: Number,
  reviewcount: Number,
  reserveddate: [Number],
  starrating: String
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports.Reservation = Reservation;
module.exports.db = db;
