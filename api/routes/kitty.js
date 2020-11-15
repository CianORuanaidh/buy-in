const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const Kitty = require('../models/Kitty');

// POST METHOD
// create kitty
router.post('/', async (req, res) => {

    const { name, buyInAmount, participants } = req.body;

    if (!(name && buyInAmount && participants)) {
        res.status(400).json({ message: 'Please provide name, buyInAmount & participants' });
        return;
    }

    const kittyDto = { name, buyInAmount, participants };
    
    // create an new instance of Kitty model
    const newKitty = new Kitty(kittyDto);

    // Save the kitty just created 
    const doc = await newKitty.save();

    res.json(doc);
});

// GET METHOD
// return kitty
router.get('/:kittyId', (req, res) => {
    console.log('GET KITTY')

    if (!req.params.kittyId) {
        res.status(400).json({ message: 'Please provide a kittyId parameter' });
    }
    
    const kittyId = req.params.kittyId;

    console.log(kittyId)

    const kittyDto = {
        Id: kittyId,
        Name: 'Kitty Name',
        Contributors: [1,2,3,4,5],
    }

    // return requested kitty
    res.json(kittyDto);
    
});

// PUT METHOD
// Edit kitty
router.patch('/:kittyId', (req, res) => {
    console.log('EDIT KITTY')

    if (!req.params.kittyId) {
        res.status(400).json({ message: 'Please provide a kittyId parameter' });
    }

    const kittyId = req.params.kittyId;

    console.log(kittyId)

    const kittyDto = {
        Id: kittyId,
        Name: 'Kitty Name',
        Contributors: [1,2,3,4,5],
    }

    // return requested kitty
    res.json(kittyDto);

});

// export the route
module.exports = router;