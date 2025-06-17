const express = require('express');
const router = express.Router();
let concertsDb = require('./../db').db.concerts;
const uuid = require("uuid");

router.route('/concerts').get((req, res) => {
  res.json(concertsDb);
})

router.route('/concerts/:id').get((req, res) => {
  res.status(200).json(concertsDb.filter(record => record.id.toString() === req.params.id));
})

router.route('/concerts').post((req, res) => {
  const newRecord = {
    id: uuid.v4(),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  }
  concertsDb.push(newRecord);
  res.status(200).json({ message: 'OK' });
})

router.route('/concerts/:id').put((req, res) => {
  const editedRecord = {
    id: req.params.id,
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  }
  concertsDb = concertsDb.filter(record => record.id.toString() !== req.params.id)
  concertsDb.push(editedRecord);
  res.status(200).json({ message: 'OK' });
})

router.route('/concerts/:id').delete((req, res) => {
  concertsDb = concertsDb.filter(record => record.id.toString() !== req.params.id)
  res.status(200).json({ message: 'OK' });
})

module.exports = router;