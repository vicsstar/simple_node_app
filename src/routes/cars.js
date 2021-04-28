const express = require('express');
const router = express.Router();
const { save: saveCar, update: updateCar, delete: deleteCar, findById, findAll } = require('../models/cars');

router.get('/', async (_, res) => {
    res.status(200).json(await findAll());
});

router.get('/:id', async (req, res) => {
    const result = await findById(req.params['id']);

    res.status(200).json(result);
});

// create new car.
router.post('/', async (req, res) => {
    const { make, model, year } = req.body;

    const result = await saveCar({make, model, year});

    res.status(201).json(result);
});

router.put('/:id', async (req, res) => {
    const { make, model, year } = req.body;

    const result = await updateCar({make, model, year, id: req.params['id']});

    res.status(200).json(result);
});

router.delete('/:id', async (req, res) => {
    const result = await deleteCar(req.params['id']);

    res.status(200).json(result);
});

module.exports = router;
