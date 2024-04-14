const express = require('express');
const mongoose = require('mongoose');
const authorRouter = require('./routes/authors.route');
const app = express();
const PORT = process.env.PORT || 3003;

mongoose
  .connect('mongodb://127.0.0.1:27017/authors&articles')
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/authors", authorRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});