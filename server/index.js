const express = require('express');
const bodyParser = require('body-parser');
const Reservations = require('../db/index.js');
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client.dist'));

Reservations.Reservations.create({
  _id: 1,
  reservation: 'YE BOI!'
}, () => {});

let port = 3000;

app.listen(port, () => console.log(`listening on port ${port}`));