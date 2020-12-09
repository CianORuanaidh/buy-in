const express = require('express');
const uuid = require('uuid');
const router = express.Router();

// POST METHOD
// login 
router.post('/', async (req, res) => {

    console.log('POST REQ FOR LOGIN')
    // const { name, buyInAmount, participants } = req.body;
    console.log(req.body)

    // does user exist


    const { userEmail, userName, userPassword } = req.body;

    console.log('VARIBLES')
    console.log(userEmail)
    console.log(userName)
    console.log(userPassword)

    // // create user in the DB
    // const user = await createUser({ email, password, firstName, lastName });
    // // res.json() returns 200 by default
    // res.json({ data: { id: user._id }});


    // if (!(name && buyInAmount && participants)) {
    //     res.status(400).json({ message: 'Please provide name, buyInAmount & participants' });
    //     return;
    // }

    // const kittyDto = { name, buyInAmount, participants };
    
    // // create an new instance of Kitty model
    // const newKitty = new Kitty(kittyDto);

    // // Save the kitty just created 
    // const doc = await newKitty.save();

    res.json({ data: 'loggedIn' });
});

// export the route
module.exports = router;