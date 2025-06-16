const express = require('express');
const path = require("path");
const uuid = require("uuid");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let db = [
  { id: "1", author: 'John Doe', text: 'This company is worth every coin!' },
  { id: "2", author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.status(200).json(db);
});

app.get('/testimonials/random', (req, res) => {
  const idsList = db.map(record => record.id);
  const randomId = idsList[Math.floor(Math.random() * idsList.length)];
  res.status(200).json(db.filter(record => record.id.toString() === randomId.toString()));
});

app.get('/testimonials/:id', (req, res) => {
  res.status(200).json(db.filter(record => record.id.toString() === req.params.id));
});

app.post('/testimonials', (req, res) => {
  const newRecord = {
    id: uuid.v4(),
    author: req.body.author,
    text: req.body.text
  }
  db.push(newRecord);
  res.status(200).json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  const editedRecord = {
    id: req.params.id,
    author: req.body.author,
    text: req.body.text
  }
  db = db.filter(record => record.id.toString() !== req.params.id)
  db.push(editedRecord);
  res.status(200).json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  db = db.filter(record => record.id.toString() !== req.params.id)
  res.status(200).json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});