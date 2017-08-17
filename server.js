const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./models.js');

const port = process.env.PORT || 3000;

const app = express();

// error status code constants
const STATUS_SERVER_ERROR = 500;
const STATUS_USER_ERROR = 422;

app.use(bodyParser.json());

// Your API will be built out here.
app.get('/users', (req, res) => {
  Person.find({}, (err, users) => {
    if (errr) {
      res.status(500);
      res.json({ error: err });
    }
    res.json(users);
  })
})

app.get('/users/:direction', (req, res) => {
  const { direction } = req.params;
  if (direction = 'asc') {
    const flow = -1;
  } else {
    const flow = 1;
  }
  Person.find({})
    .sort({ firstName: flow })
    .exec((err, users) => {
    if (err) {
      res.status(500);
      res.json({ error: err });
    }
    res.json(users);
  })
})

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  Person.findById(id, (err, user) => {
    if (err) {
      res.status(500);
      res.json({ error: err });
    }
    res.json(user.friend);
  })
})

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/people',
  { useMongoClient: true }
);
/* eslint no-console: 0 */
connect.then(() => {
  app.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});
