const express = require('express');
const db = require('./db');

//we use this to what type of data can put or get in side person service
const Person = require('./models/Person');
const Menu = require('./models/Menu');

const app = express();


//when use send data in any format it is use to convert user data to we requied form
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('i am inside method');
});

app.get('/person', async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(error);
    res.status(500, { error: 'Internal server error' });
  }
});

app.post('/person', async (req, res) => {

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

app.get('/menu', async (req, res) => {
  try {
    const data = await Menu.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(error);
    res.status(500, { error: 'Internal server error' });
  }
});

app.post('/menu', async (req, res) => {

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

app.delete('/menu/:id', async (req, res) => {
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

app.listen(3000);
