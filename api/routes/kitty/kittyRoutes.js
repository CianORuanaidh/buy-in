const express = require('express');
const router = express.Router();
const { 
    createKitty, 
    findAllKitties, 
    findKittyById, 
    updateKitty, 
    deleteKittyById, 
    getPlayerIds, 
    createPlayerGroup, 
    // getPlayerGroupById, 
    linkPLayerGroupToKitty, 
    findKittyByInviteId,
    confirmPlayersForKitty } = require('./kittyController');
const { verifyToken } = require('../../middleware/verifyToken');


// router.route('/linkPLayerGroupToKitty')
// .get(async (req, res) => {

//     try {
//         const doc = await linkPLayerGroupToKitty('6060d4a9cbd4c10784cacb91', '6060dcd9d62b0508cf1b0e4d');

//         console.log('HERE')
//         res.json(doc)
//     }
//     catch(e)
//     {
//         res.json('ERROR')
//     }

//     return;
// })

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
        return;
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

// GET METHOD
// return kitty
router
.route('/invite/:kittyInviteId')
.get(async (req, res) => {

    if (!req.params.kittyInviteId) {
        res.status(400).json({ message: 'Please provide an Id parameter' });
        return;
    }

    const kittyInviteId = req.params.kittyInviteId;
        
    let doc;

    try {
        doc = await findKittyByInviteId(kittyInviteId);

        if (!doc) {
            res.status(404).json({ message: `Kitty not found.` });
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


// Add players to kitty
router
.route('/:kittyId/players')
.post(async (req, res) => {
    
    const inviteEmails = req.body;
    const hasEmptyEmails = inviteEmails.filter(email => !email).length > 0;

    if(!inviteEmails || !inviteEmails.length || hasEmptyEmails) {
        res.status(400).json({ message: `One or more emails are invalid` });
        return;
    }
    

    let doc;

    try 
    {
        const kitty = await findKittyById(req.params.kittyId);
        const playerIds = await getPlayerIds(req.body);
        const user = req.user;
        const groupName = `${kitty.name}_group`;
        
        console.log('HERE')
        console.log(kitty)
        if (kitty.playerGroup === null) {
            console.log('NO PLAYERS YET')
            
            const newPlayerGoup = await createPlayerGroup(playerIds, user.id, groupName);
            doc = await linkPLayerGroupToKitty(req.params.kittyId, newPlayerGoup._id);
        
        } else {
            console.log('ALREADY HAVE PLAYERS')
            // update GROUP
            doc = 'UPDATE GROUP'

            // see what players need to fee removed or added
            // update appropriatley

            console.log('kitty.playerGroup')
            console.log(kitty.playerGroup)

            console.log('playerIds')
            console.log(playerIds)

        }

    }
    catch (e) 
    {
        console.log(e)
        res.status(500).json({ message: `There was a problen saving these changes.`, error: err.message });
        return;
    }

    res.json(doc)
    return;
});

// Add players to kitty
router
.route('/:kittyId/playerconfirm')
.post(async (req, res) => {
    
    console.log('HERE')
    const playerEmails = req.body;
    const kittyId = req.params.kittyId;
    const hasEmptyEmails = playerEmails.filter(email => !email).length > 0;

    console.log(playerEmails)
    console.log(req.params)

    
    
    
    if(!playerEmails || !playerEmails.length || hasEmptyEmails) {
        res.status(400).json({ message: `One or more emails are invalid` });
        return;
    }

    let doc;

    try 
    {
        // const kitty = await findKittyById(req.params.kittyId);
        // const playerIds = await getPlayerIds(req.body);
        
        // console.log(kitty)
        // console.log(playerIds)

        doc = await confirmPlayersForKitty(kittyId, playerEmails);

        console.log('doc:', doc)


        // const user = req.user;
        // const groupName = `${kitty.name}_group`;
        // const newPlayerGoup = await createPlayerGroup(playerIds, user.id, groupName);

        // doc = await linkPLayerGroupToKitty(req.params.kittyId, newPlayerGoup._id);
    }
    catch (e) 
    {
        console.log(e)
        res.status(500).json({ message: `There was a problen saving these changes.`, error: err.message });
        return;
    }
    
    // res.json(doc)
    res.json('PLAYER CONFIRM')
    return;
});




// export the route
module.exports = router;