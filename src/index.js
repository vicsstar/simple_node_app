const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;

const carsRouter = require('./routes/cars');

app.use(express.static('web'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/cars', carsRouter);

app.listen(port, () => console.log(`Simple Car App, listening on port ${port}`));
