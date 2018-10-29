const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// const Reservation = require('./index.js');
const { Reservation } = require('./index.js');

const genPropId = () => Math.floor(Math.random() * 101);
const genPrice = () => Math.floor(Math.random() * 2001);
const genRevCount = () => Math.floor(Math.random() * 61);
const genAvailDate = () => Math.floor(Math.random() * 32);
const genReservDate = () => Math.floor(Math.random() * 32);

const seedDb = Array.from({ length: 100 }, () => {
  return {
    propertyId: genPropId(), //researching a way to have sequential IDs
    costPerNight: genPrice(),
    reviewCount: genRevCount(),
    availableDate: genAvailDate(), //would love to have non-conflicting behavior with reserved dates
    reservedDate: genReservDate()
  }
});

Reservation.create(seedDb); //need to create a way to terminate seeding script so it's doesn't continue to run.
