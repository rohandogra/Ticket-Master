const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
require('dotenv').config();
const configDB = require('./config/database');
const router = require('./config/routes');

const cors = require('cors');
configDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/user', router);

//* Handles any requests that don't match the ones above
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => {
  console.log('Listing node server on port number', port);
});
