const express = require('express');
const router = express.Router();
const { createKitty, findAllKitties, findKittyById, updateKitty, deleteKittyById, getPlayerIds, createPlayerGroup, getPlayerGroupById } = require('./kittyController');
const { verifyToken } = require('../../middleware/verifyToken');

// POST METHOD
// create kitty
router
.use(verifyToken)
.route('/')
.post(async (req, res) => {

    const kittyDto = req.body;
    const user = req.user;
    const { name, buyInAmount } = kittyDto;
    let doc;
        
    if (!(name && buyInAmount)) {
        res.status(400).json({ message: 'Please provide name, buyInAmount, closeDateTime & noClosingDate' });
        return;
    }
        
    try 
    {
        doc = await createKitty(user, kittyDto);    
    } 
    catch(err) 
    {
        console.log(err)
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

// DELETE METHOD
// Delete kitty
router
.route('/:kittyId')
.delete(async (req, res) => {
    
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

// DELETE METHOD
// Delete kitty
router
.route('/:kittyId/players')
.post(async (req, res) => {
    
    // console.log(req.body)

    const inviteEmails = req.body;
    const hasEmptyEmails = inviteEmails.filter(email => !email).length > 0;

    // console.log(inviteEmails)
    // console.log(hasEmptyEmails)

    // console.log('CHECKS')
    // console.log(!inviteEmails)
    // console.log(!inviteEmails.length)
    // console.log(hasEmptyEmails)

    if(!inviteEmails || !inviteEmails.length || hasEmptyEmails) {
        res.status(400).json({ message: `One or more emails are invalid` });
        return;
    }
    
    let playerGoup;

    try 
    {
        console.log('NOW TRY THIS')
        // const playerIds = await getPlayerIds(req.body);
        // const kitty = await findKittyById(req.params.kittyId);
        // const user = req.user;
        
        // console.log('STUFF')
        // console.log(playerIds)
        // console.log(kitty)
        // console.log(user)

        // const groupName = `${kitty.name}_group`;

        // const newPlayerGoup = await createPlayerGroup(playerIds, user.id, groupName);

        playerGoup =  await getPlayerGroupById('6059c8fcb6df99040a7589a8');
        console.log(playerGoup)

    }
    catch (e) 
    {
        console.log(e)
    }

    
    res.json(playerGoup)

    return;
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