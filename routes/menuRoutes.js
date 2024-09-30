const express = require('express');
const Menu = require('./../models/Menu');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = await Menu.find();
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500, { error: 'Internal Server Error' });
    }
});

router.get('/:taste', async (req, res) => {
    try {
        const tasteType = req.params.taste;
        if (tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour') {
            const data = await Menu.find({ taste: tasteType });
            res.status(200).json(data);
        }
        else {
            res.status(400).json({ error: 'Invalid Taste Type' });
        }
    } catch (err) {
        res.status(500, { error: 'Internal Server Error' });
    }
});

router.post('/', async (req, res) => {
    try {
        //the data send by user is inside this body
        const data = req.body;
        console.log(data);

        //the data send by the user should folow the rule of person model
        const newMenu = new Menu(data);
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500, { error: 'Internal server error' });

    }
});


router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const updatedMenuData = req.body;
        const response = await Menu.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true,
            runValidators: true //mongoose validation check data correct or not
        });
        if (!response) {
            res.status(404).json({ eroor: 'Menu not Found' });
        }
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500, { err: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the URL parameters
        const deletedMenu = await Menu.findByIdAndDelete(id); // Delete the document
        if (!deletedMenu) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
