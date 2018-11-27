const mongoose = require('mongoose');
const {Reservation, db} = require('./index.js');
mongoose.Promise = global.Promise;

let count = 1;
let rating = ['Exceptional 5/5', 'Awesome 4/5', 'Great 3/5'];

const genPrice = () => Math.floor(Math.random() * 2001);
const genRevCount = () => Math.floor(Math.random() * 61);
const range = (start, end) => {
  return Array.from({length: (end - start)}, (a, b) => b + start)
};

const seedDb = Array.from({length: 100}, () => {
  let startDate = Math.ceil(Math.random() * 20);
  let endDate = startDate + Math.ceil(Math.random() * 10);
  return {
    propertyid: count++,
    costpernight: genPrice(),
    reviewcount: genRevCount(),
    reserveddate: range(startDate, endDate),
    starrating: rating[Math.floor(Math.random() * 3)]
  }
});

Reservation.create(seedDb).then(() => db.close());
