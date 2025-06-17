const express = require('express');
const router = express.Router();
let seatsDb = require('./../db').seats;
const uuid = require("uuid");

router.route('/seats').get((req, res) => {
  res.json(seatsDb);
})

router.route('/seats/:id').get((req, res) => {
  res.status(200).json(seatsDb.filter(record => record.id.toString() === req.params.id));
})

router.route('/seats').post((req, res) => {
  const isTaken = seatsDb.some(record => record.seat === req.body.seat && record.day === req.body.day);
  if (isTaken) {
    return res.status(409).json({ message: "The slot is already taken..." });
  }
  const newRecord = {
    id: uuid.v4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  }
  seatsDb.push(newRecord);
  res.status(200).json({ message: 'OK' });
})

router.route('/seats/:id').put((req, res) => {
  const editedRecord = {
    id: req.params.id,
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  }
  seatsDb = seatsDb.filter(record => record.id.toString() !== req.params.id)
  seatsDb.push(editedRecord);
  res.status(200).json({ message: 'OK' });
})

router.route('/seats/:id').delete((req, res) => {
  seatsDb = seatsDb.filter(record => record.id.toString() !== req.params.id)
  res.status(200).json({ message: 'OK' });
})

module.exports = router;