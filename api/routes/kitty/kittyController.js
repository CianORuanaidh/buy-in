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