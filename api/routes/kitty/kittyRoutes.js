const express = require('express');
const router = express.Router();
const { createKitty } = require('./kittyController');
const { verifyToken } = require('../../middleware/verifyToken');

// POST METHOD
// create kitty
router
.use(verifyToken)
.route('/')
.post(async (req, res) => {

    const kittyDto = req.body;
    const user = req.user;

    let { name, buyInAmount, participants } = req.body;
    
    if (!(name && buyInAmount && participants)) {
        res.status(400).json({ message: 'Please provide name, buyInAmount & participants' });
        return;
    }
    
    const doc = await createKitty(user, kittyDto);

    res.json(doc);
    return;

    // participants = JSON.stringify(participants);

    // const kittyDto = { name, buyInAmount, participants };
    
    // console.log('here')
    // console.log(kittyDto)
    // console.log(user.id)
    // // create an new instance of Kitty model
    // const newKitty = new Kitty(kittyDto);
    
    // console.log(newKitty)
    
    // // Save the kitty just created 
    // const doc = await newKitty.save();

});

// // GET METHOD
// // return all kittys
// router.get('/', async (req, res) => {
//     console.log('GET KITTY')

        
//     let doc;

//     try 
//     {
//          doc = await Kitty.find()
//     } 
//     catch(err) 
//     {
//         res.status(500).json({ message: `Could not find record with id: ${kittyId}` });
//         return;
//     }

//     // return requested kitty
//     res.json(doc);    
// });


// // GET METHOD
// // return kitty
// router.get('/:kittyId', async (req, res) => {
//     console.log('GET KITTY')

//     if (!req.params.kittyId) {
//         res.status(400).json({ message: 'Please provide a kittyId parameter' });
//     }
        
//     const kittyId = req.params.kittyId;
//     let doc;

//     try 
//     {
//          doc = await Kitty.findById(kittyId);
//     } 
//     catch(err) 
//     {
//         res.status(500).json({ message: `Could not find record with id: ${kittyId}` });
//         return;
//     }

//     // return requested kitty
//     res.json(doc);    
// });

// PUT METHOD
// Edit kitty
// router.patch('/:kittyId', async (req, res) => {

//     if (!req.params.kittyId) {
//         res.status(400).json({ message: 'Please provide a kittyId parameter' });
//     }
    
//     const kittyId = req.params.kittyId;
//     let kitty;
    
//     kitty = await Kitty.findById(kittyId);

//     if (!kitty) {
//         res.status(400).json({ message: `Could not find record with id: ${kittyId}` });
//         return;
//     }
    
//     const { name, buyInAmount, participants} = req.body;

//     if (name) {
//         kitty.name = name;
//     }
//     if (buyInAmount) {
//         kitty.buyInAmount = buyInAmount;
//     }
//     if (participants && Array.isArray(participants)) {
//         kitty.participants = participants;        
//     }

//     const doc = await kitty.save()
    
//     // return requested kitty
//     res.json(doc);
// });

// // DELETE METHOD
// // Delete kitty
// router.delete('/:kittyId', async (req, res) => {

//     if (!req.params.kittyId) {
//         res.status(400).json({ message: 'Please provide a kittyId parameter' });
//     }

//     const kittyId = req.params.kittyId;
//     let kitty;

//     kitty = await Kitty.findById(kittyId);

//     if (!kitty) {
//         res.status(400).json({ message: `Could not find record with id: ${kittyId}` });
//         return;
//     }

//     const doc = await kitty.delete();

//     res.json(doc)
// });

// export the route
module.exports = router;