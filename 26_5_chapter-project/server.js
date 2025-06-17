const express = require('express');
const path = require("path");
const uuid = require("uuid");

const app = express();

const testimonialsRoutes = require('./routes/testimonials.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', testimonialsRoutes);

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});