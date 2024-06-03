const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const createError = require('http-errors');

const startScheduleJobs = require('./jobs');

const authorsRouter = require('./routes/authors.route');
const usersRouter = require('./routes/users.route');
const authRouter = require('./routes/auth.route');


const app = express();
const PORT = process.env.PORT || 3003;

mongoose
  .connect('mongodb://127.0.0.1:27017/authors&articles')
  .then(() => {
    console.log('Connected to DB');
    startScheduleJobs();})
  .catch((err) => console.log(err));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method}: ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({
      status: 200,
      data: {
        message: "Node.js Authors&Articles app"
      }
  })
});

app.use("/authors", authorsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);


//Сatching the 404 and forwarding to the Error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// Error handler
app.use((err, req, res, next) => {
  const erorrStatus = err.status || 500;
  console.error(`------!!!!!!!! [${new Date().toUTCString()}] ${req.method}: ${req.path}. Error(${erorrStatus}): ${err.message} !!!!!!!!-------`, );
  res.status(erorrStatus).send({
      status: erorrStatus,
      error: err
  });
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});


