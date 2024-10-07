const express = require('express');
//we use this to what type of data can put or get in side person service
const Person = require('./../models/Person');
const router = express.Router();
const { jwtAuthMiddleware, generateToken } = require('./../jwt')

router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await Person.find();
        res.status(200).json(data);
    } catch (err) {
        console.log(error);
        res.status(500, { error: 'Internal server error' });
    }
});

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user;
        console.log("User Data :", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);
        res.status(200).json({ user });
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

router.post('/signup', async (req, res) => {
    try {
        //the data send by user is inside this body
        const data = req.body;
        console.log(data);

        //the data send by the user should folow the rule of person model
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');

        const payload = {
            id: response.id,
            username: response.username
        };

        const token = generateToken(payload);
        console.log("token is :", token);

        res.status(200).json({ response: response, token: token });
    } catch (error) {
        console.log(error);
        res.status(500, { error: 'Internal server error' });

    }
});

// login route

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);

        const user = await Person.findOne({ username: username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // genterate token

        const payload = {
            id: user.id,
            username: user.username
        };

        const token = generateToken(payload);

        res.json({ token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
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