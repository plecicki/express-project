const express = require('express');
const router = express.Router();
let testimonialsDb = require('./../db').testimonials;
const uuid = require("uuid");

router.route('/testimonials').get((req, res) => {
  res.json(testimonialsDb);
})

router.route('/testimonials/random').get((req, res) => {
  const idsList = testimonialsDb.map(record => record.id);
  const randomId = idsList[Math.floor(Math.random() * idsList.length)];
  res.status(200).json(testimonialsDb.filter(record => record.id.toString() === randomId.toString()));
})

router.route('/testimonials/:id').get((req, res) => {
  res.status(200).json(testimonialsDb.filter(record => record.id.toString() === req.params.id));
})

router.route('/testimonials').post((req, res) => {
  const newRecord = {
    id: uuid.v4(),
    author: req.body.author,
    text: req.body.text
  }
  testimonialsDb.push(newRecord);
  res.status(200).json({ message: 'OK' });
})

router.route('/testimonials/:id').put((req, res) => {
  const editedRecord = {
    id: req.params.id,
    author: req.body.author,
    text: req.body.text
  }
  testimonialsDb = testimonialsDb.filter(record => record.id.toString() !== req.params.id)
  testimonialsDb.push(editedRecord);
  res.status(200).json({ message: 'OK' });
})

router.route('/testimonials/:id').delete((req, res) => {
  testimonialsDb = testimonialsDb.filter(record => record.id.toString() !== req.params.id)
  res.status(200).json({ message: 'OK' });
})

module.exports = router;