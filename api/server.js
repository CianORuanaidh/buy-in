const express = require('express');
const bodyParser = require('body-parser');
const kittyRoutes = require('./routes/kitty');
const cors = require('cors');

// instantiate express app
const app = express();

// use to allow CORS
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // For legacy browser support
}
app.use(cors(corsOptions));

// instantiate mongoose
const mongoose = require('mongoose');
// Connection strig to LOCAL DB
const uri = 'mongodb://localhost:27017/kitty-app';
const PORT = 5000;

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

// add middleware to parse the body of requests
app.use(bodyParser.json());

app.use('/api/kitty', kittyRoutes);

const port = 4000;
app.listen(port, () => {
    console.log(`Yes. Server running on port ${port}`);
});