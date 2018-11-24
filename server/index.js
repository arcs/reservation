const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Reservation = require('../db/index.js');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

app.get('/:propertyid', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
});

app.get('/reservation/:propertyid', (req, res) => {
  Reservation.find({propertyid: req.params.propertyid}, (err, data) => {
    err ? console.error(err) : res.status(200).send(data);
  })
});

app.listen(port, () => console.log(`listening on port ${port}`));
