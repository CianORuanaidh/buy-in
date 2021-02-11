const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const kittyRoutes = require('./routes/kitty/kittyRoutes');
const usersRoutes = require('./routes/user/userRoutes');

// instantiate express app
const app = express();

// use to allow CORS
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials:  true,
  optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));

// instantiate mongoose
const mongoose = require('mongoose');
// Connection strig to LOCAL DB
const uri = 'mongodb://localhost:27017/kitty-app';

// Connect to database
mongoose
.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => { 
  console.log(`Successfully connected to Database on port: ${uri} `);
})
.catch( err => {
  console.log('Did not connect to DB')
  console.log(err.message);
})


// add middleware to parse the body & cookies of requests
app.use(cookieParser())
app.use(bodyParser.json());

// routes
app.use('/api/kitty', kittyRoutes);
app.use('/api/users', usersRoutes);

// const port = 4000;
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Yes. Server running on port ${PORT}`);
});