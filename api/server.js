const express = require('express');
const bodyParser = require('body-parser');
const kittyRoutes = require('./routes/kittyRoute');

// instantiate express app
const app = express();

// add middleware to parse the body of requests
app.use(bodyParser.json());

app.use('/api/kitty', kittyRoutes);

const port = 4000;
app.listen(port, () => {
    console.log(`WOOOOOOOOOO server running on port ${port}`);
});