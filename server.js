const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const db = require('./db');
const passport = require('./auth');
require('dotenv').config();
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

const PORT = process.env.PORT || 3000; // Use environment variable for PORT

const app = express();

// Middleware to parse JSON bodies
app.use(express.json()); // You can replace bodyParser.json() with express.json()

// Configure CORS to allow all origins
app.use(cors());

//auth

app.use(passport.initialize());

// If you prefer to allow specific origins, use the following configuration instead:
// const corsOptions = {
//   origin: ['https://your-frontend-domain.com', 'http://localhost:3000'], // Replace with your frontend URLs
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'], // Add any other headers you need
//   credentials: true, // Enable if you need to send cookies or authentication headers
// };
// app.use(cors(corsOptions));

const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get('/', (req, res) => {
  res.send('Welcome to your Hotel');
});

app.use('/person',localAuthMiddleware, personRoutes);
app.use('/menu', menuRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
