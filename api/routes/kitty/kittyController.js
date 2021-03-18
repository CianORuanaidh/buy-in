const Kitty = require('./kittyModel');
const Player = require('./playerModel');
const PlayerGroup = require('./playerGroupModel');
const User = require('../user/userModel');

exports.createKitty = async (user, kittyDto) => {
    
    // let playersDto = [];

    // const players = kittyDto.participants;
    // if (players && players.length > 0) {
    //     playersDto = await Promise.all( 
    //     players.map(async p => {
            
    //         let player = await Player.findOne({ email: p.email });
            
    //         // if player does not exist > create a new one
    //         if (player == null) {
    //             player = await new Player(p).save();
    //         }
            
    //         return player._id;
    //     })
    //     );
    // }


    const player = await addUserToPLayerGroup(user);    
    let dateCreated = new Date().toISOString();
    
    const newKittyDto = {
        ...kittyDto,
        // participants: playersDto,
        user: user.id,
        dateCreated
    }
    
    // create an new instance of Kitty model
    const newKitty = new Kitty(newKittyDto);

    // console.log('IN CONTROLLER')
    // console.log(newKitty)    
    // return ({ someting:'something' });


    // Save the kitty just 
    const doc = await newKitty.save();
    
    // retrive kitty with populated references
    const returnKitty = await Kitty
    .findOne({ _id: doc._id })
    .select('-__v -user')
    // .populate('participants');
    // .populate('user')
    
    return returnKitty;
    
}

const addUserToPLayerGroup = async (user) => {
    const u = await User.findById(user.id);
    const email = u.email;
    const name = `${u.firstName} ${u.lastName}`;

    let player = await Player.findOne({ email });

    if (player === null) {
        player = await new Player({ email, name }).save();
    }

    return player;
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

    return 'DELETED ' + kittyId;
}
