const express = require('express');
const uuid = require('uuid');
const router = express.Router();

// POST METHOD
// create kitty
router.post('/', (req, res) => {
    console.log('POST KITTY')

    const kittyId = uuid.v4();
    console.log(kittyId)

    const kittyDto = {
        Id: kittyId,
        Name: 'Kitty Name',
        Contributors: [1,2,3,4,5],
    }

    res.json(kittyDto);
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