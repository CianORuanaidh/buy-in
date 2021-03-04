const Kitty = require('./kittyModel');
const Player = require('./playerModel');

exports.createKitty = async (user, kittyDto) => {
    
    const players = kittyDto.participants;

    
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
    
}

exports.findAllKitties = async (user) => {

    const allKitties = await Kitty.find({ user: user.id })
        .select('-__v -user')
        .populate('participants', '-_id -__v');

    return allKitties;

}

exports.findKittyById = async (id) => {

    const kitty = await Kitty.findById(id)
        .select('-__v')
        .populate('participants', '-_id -__v');

    return kitty;
}

exports.updateKitty = async (id, newKittyDto) => {

    const kitty = await Kitty.findById(id);

    kitty.name = newKittyDto.name;        
    kitty.buyInAmount = newKittyDto.buyInAmount;
    
    const invalidPlayers = newKittyDto.participants.filter(p => !p.name || !p.email);
    if (invalidPlayers.length > 0) {
        throw new Error('Thee was a problem saving players');
    }

    const players = newKittyDto.participants;

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

    kitty.participants = playerDtos;

    const savedKitty = await kitty.save();

    return savedKitty;    
}

exports.deleteKittyById = async (kittyId) => {

    const doc = await Kitty.deleteOne({ _id: kittyId});

    console.log('IS DELETED? ', doc);

    return 'DELETED ' + kittyId;
}
