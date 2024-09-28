const express = require('express');
//we use this to what type of data can put or get in side person service
const Person = require('./../models/Person');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        res.status(200).json(data);
    } catch (err) {
        console.log(error);
        res.status(500, { error: 'Internal server error' });
    }
});

router.get('/:worktype', async (req, res) => {
    try {
        const worktype = req.params.worktype;
        if (worktype == 'chef' || worktype == 'manager' || worktype == 'waiter') {
            const response = await Person.find({ work: worktype });
            console.log('response fetched');
            res.status(200).json(response);
        }
        else {
            res.status(400).json({ error: 'Invalid Work Type' });
        }
    } catch (err) {
        console.log(error);
        res.status(500, { error: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        //the data send by user is inside this body
        const data = req.body;
        console.log(data);

        //the data send by the user should folow the rule of person model
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500, { error: 'Internal server error' });

    }
});

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true //mongoose validation check data correct or not
        });
        if (!response) {
            res.status(404).json({ eroor: 'Person not Found' });
        }
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500, { err: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            res.status(404).json({ eroor: 'Person not Found' });
        }
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500, { err: 'Internal server error' });
    }
});

module.exports = router;