const Kitty = require('./kittyModel');
const Player = require('./playerModel');

exports.createKitty = async (user, kittyDto) => {
    
    const players = kittyDto.participants;

    try {

        const playerDtos = await Promise.all( 
            players.map(async p => {
    
                let player = await Player.findOne({ email: p.email });
    
                // if player does not exist > create a new one
                if (player == null) {
                    player = await new Player(p).save();
                }
                
                return player._id;
            })
        );
        
        const newKittyDto = {
            ...kittyDto,
            participants: playerDtos,
            user: user.id
        }
    
        // create an new instance of Kitty model
        const newKitty = new Kitty(newKittyDto);
        
        // Save the kitty just 
        const doc = await newKitty.save();
        
        // retrive kitty with populated references
        const returnKitty = await Kitty
            .findOne({ _id: doc._id })
            .populate('user')
            .populate('participants');
    
        return returnKitty;
    
    } catch (ex) {

        throw ex;
    }

}

exports.findAllKitties = async (user) => {

    try {

        const allKitties = await Kitty.find({ user: user.id })
            .select('-__v -user')
            .populate('participants', '-_id -__v');

        return allKitties;

    } catch(ex) {

        throw ex;
    }

}

exports.findKittyById = async (id) => {

    try {
        const kitty = await Kitty.findById(id)
        .select('-__v')
        .populate('participants', '-_id -__v');;

        return kitty;
    } 
    catch(ex) {

        throw ex;
    }

}