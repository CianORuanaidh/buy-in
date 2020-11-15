const express = require('express');
const bodyParser = require('body-parser');

// instantiate express app
const app = express();

// add middleware to parse the body of requests
app.use(bodyParser.json());

const port = 4000;
app.listen(port, () => {
    console.log(`WOOOOOOOOOO`)
    console.log(`Server running on port ${port}`)
    console.log(`WAT?`)
});




// const bodyParser = require('body-parser');
// const productRoutes = require('./routes/productRoutes');
// const cartRoutes = require('./routes/cartRoutes');

// // Instantiate an empty express app
// const app = express();

// // Adds middleware to parse the BODY of request
// // app.use('/',bodyParser.json());
// app.use(bodyParser.json());

// // route to products
// app.use('/api/products', productRoutes)

// app.use('/api/carts', cartRoutes);

// // Create Reate App will run on 3000
// // max por num 65535
// app.listen('4000', () => {
//     console.log('Server running on port 4000');
//     console.log('WHAT');
// });