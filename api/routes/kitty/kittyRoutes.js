const express = require('express');
const router = express.Router();
const { createKitty, findAllKitties, findKittyById, updateKitty, deleteKittyById } = require('./kittyController');
const { verifyToken } = require('../../middleware/verifyToken');

// POST METHOD
// create kitty
router
.use(verifyToken)
.route('/')
.post(async (req, res) => {

    let doc;

    const kittyDto = req.body;
    const user = req.user;

    let { name, buyInAmount, participants } = req.body;
    
    if (!(name && buyInAmount)) {
        res.status(400).json({ message: 'Please provide name & buyInAmount' });
        return;
    }
    

    try {

        doc = await createKitty(user, kittyDto);
    
    } 
    catch(err) {

        res.status(500).json({ message: `Could not create kitty, please try again` });
        return;
    }

    res.json(doc);
    return;
});

// // GET METHOD
// // return all kittys
router
.route('/')
.get(async (req, res) => {
    // console.log('GET ALL KITTYA')
    let doc;
        
    try {

        const user = req.user;
        doc = await findAllKitties(user);

    } 
    catch(err) 
    {
        res.status(500).json({ message: `Could not find records for this user` });
        return;
    }

    // return requested kitty
    res.json(doc);    
    return;    
});


// GET METHOD
// return kitty
router
.route('/:kittyId')
.get(async (req, res) => {

    if (!req.params.kittyId) {
        res.status(400).json({ message: 'Please provide an Id parameter' });
    }
        
    const kittyId = req.params.kittyId;

    let doc;

    try {

        doc = await findKittyById(kittyId);

        if (!doc) {
            res.status(404).json({ message: `Kitty not found.` });
            return;
        }

        if (!req.user || req.user.id != doc.user) {
            res.status(500).json({ message: `You are not authorized to see this kitty.` });
            return;
        }

    } 
    catch(err) 
    {
        res.status(500).json({ message: `There was a problen retrieving your kitty.`, error: err.message });
        return;
    }

    res.json(doc); 
    return;   
});

// PUT METHOD
// Edit kitty
router
.route('/:kittyId')
.patch(async (req, res) => {
    
    const { kittyId } = req.params;
    const newKittyDto = req.body; 
    
    if (!kittyId || !newKittyDto) {
        res.status(400).json({ message: 'Please provide a kittyId parameter' });
    }
    
    let doc 
    
    try {
        doc = await updateKitty(kittyId, newKittyDto);

        if (!req.user || req.user.id != doc.user) {
            res.status(500).json({ message: `You are not authorized to see this kitty.` });
            return;
        }
    } 
    catch (err) 
    {
        res.status(500).json({ message: `There was a problen saving these changes.`, error: err.message });
        return;
    }
    
    res.json(doc);
    return;
});

// // DELETE METHOD
// // Delete kitty
router
.route('/:kittyId')
.delete(async (req, res) => {

    console.log('HERE')
    console.log(req.params)

    
    const { kittyId } = req.params;
    
    if (!kittyId) {
        res.status(400).json({ message: 'Please provide a kittyId parameter' });
    }
    
    res.json(deleteKittyById(kittyId))
    // let kitty;

    // kitty = await Kitty.findById(kittyId);

    // if (!kitty) {
    //     res.status(400).json({ message: `Could not find record with id: ${kittyId}` });
    //     return;
    // }

    // const doc = await kitty.delete();

    // res.json(doc)
    return;
});

// export the route
module.exports = router;