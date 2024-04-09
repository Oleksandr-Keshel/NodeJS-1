const express = require('express');
const authorRouter = require('./routes/authors.route');
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", authorRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});