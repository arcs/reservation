const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Reservations = require('../db/index.js');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

app.get('/:reservations', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
});

app.get('/reservations/:propertyId', (req, res) => {
  Reservations.find({propertyId: req.params.propertyId}, (err, data) => {
    err ? console.error(err) : res.status(200).send(data);
  })
});

app.listen(port, () => console.log(`listening on port ${port}`));
