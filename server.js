const express = require('express');
const db = require('./db');
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

const app = express();

//when use send data in any format it is use to convert user data to we requied form
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to your Hotel                   ');
});

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(3000);
