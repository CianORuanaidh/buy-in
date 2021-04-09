const Kitty = require('./kittyModel');
const Player = require('./playerModel');
const PlayerGroup = require('./playerGroupModel');
const User = require('../user/userModel');
const { populate } = require('./playerGroupModel');

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


    const player = await addUserToPlayerGroup(user);    
    let dateCreated = new Date().toISOString();
    
    const newKittyDto = {
        ...kittyDto,
        // participants: playersDto,
        user: user.id,
        dateCreated
    }
    
    // create an new instance of Kitty model
    const newKitty = new Kitty(newKittyDto);

    // Save the kitty just 
    const doc = await newKitty.save();
    
    // retrive kitty with populated references
    const returnKitty = await Kitty.findOne({ _id: doc._id })
        .select('-__v -user')
        // .populate('participants');
        // .populate('user')
        
    return returnKitty;
    
}

const addUserToPlayerGroup = async (user) => {
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
        .populate({ 
                    path: 'playerGroup', 
                    select: '-_id -__v -user',
                    populate: [
                        { path: 'players', select : '-_id -__v' }, 
                        { 
                            path: 'playersTwo', 
                            populate: { path: 'player', select : '-_id -__v' }
                        }
                    ] 
                 });

    return kitty;
}

exports.findKittyByInviteId = async (inviteId) => {

    const kitty = await Kitty.findOne({inviteId})
        .select('-__v')
        .populate({ 
                    path: 'playerGroup', 
                    select: '-_id -__v -user',
                    populate: [
                        { path: 'players', select : '-_id -__v' }, 
                        { 
                            path: 'playersTwo', 
                            populate: { path: 'player', select : '-_id -__v' }
                        }
                    ] 
                 })
        .populate({path: 'user', select: '-_id firstName lastName'});

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

const getPlayerIds = async (playerList) => {

        playersDto = await Promise.all( 
            playerList.map(async p => {
            
                let player = await Player.findOne({ email: p });

                // // if player does not exist > create a new one
                if (player == null) {
                    const newPLayer = { name: p, email: p };
                    player = await new Player(newPLayer).save();
                }
                
                return player._id;
            })
        );

    return playersDto;
}
exports.getPlayerIds = getPlayerIds;


exports.getPlayerGroupById = async(id) => {
    const playerGroup = await PlayerGroup.findById(id)
                                .select('-__v')
                                .populate('players', '-__v -_id')
                                .populate('user', 'email -_id');
    return playerGroup;
}

exports.createPlayerGroup = async (playerIds, userId, groupName) => {

    const playerDtos = playerIds.map(id => {
        return ({
            player: id,
            isInvited: true,
            isConfirmedIn: false,
            hasPaid: false
        })
    })

    const newPlayerGroupDto = {
        name: groupName,
        players: playerIds,
        playersTwo: playerDtos,
        user: userId
    }

    console.log('\n \n')
    console.log('IN createPlayerGroup')
    // create an new instance of playerGroup model
    const newPlayerGroup = new PlayerGroup(newPlayerGroupDto);

    console.log('newPlayerGroup')
    console.log(newPlayerGroup)

    // Save the playerGroup 
    const doc = await newPlayerGroup.save();

    console.log('NOW DOC')
    console.log(doc)


    return doc;
}

exports.linkPLayerGroupToKitty = async (kittyId, playerGroupId) => {

    const kitty = await Kitty.findById(kittyId);
    kitty.playerGroup = playerGroupId;

    console.log('\n\n')
    console.log('linkPLayerGroupToKitty')
    console.log(kitty)
    
    const doc = await kitty.save();
    const populatQuery = { 
        path: 'playerGroup', 
        select: '-_id -__v -user',
        populate: { 
            path: 'players', 
            select : '-_id' 
        } 
    };

    const updatedKitty = await Kitty.findById(kittyId)
        .select('-__v')
        .populate(populatQuery);

    return updatedKitty;
}

exports.confirmPlayersForKitty = async (kittyId, playerEmails) => {

    const kitty = await Kitty.findById(kittyId).populate();
    // console.log(kitty)


    const playerGroup = await PlayerGroup.findById(kitty.playerGroup).populate('playersTwo');
    console.log('HERE playerGroup')
    console.log(playerGroup)

    // let playerIds = [];
    // console.log('playerEmails: ')
    // console.log(playerEmails)
    const playerIds = await getPlayerIds(playerEmails);
    
    // console.log('playerIds')
    // console.log(playerIds)

    playerIds.forEach(id => {
        // console.log('ID: ', id)

        const playerExistisInPLaterGroup = playerGroup.playersTwo.find(p => `${p.player}` == `${id}`)

        // console.log('playerExistisInPLaterGroup')
        // console.log(playerExistisInPLaterGroup)

        if (playerExistisInPLaterGroup) {
            console.log('PLAYER EXISTS ALREADY')

            playerGroup.playersTwo.map(p => {
                p.isConfirmedIn = p.isConfirmedIn == true || `${p.player}` == `${id}`;        
                return p;
            })

        } else {
            console.log('PLAYER DOES NOT EXIST')
            playerGroup.playersTwo.push({
                player: id,
                isInvited: true,
                isConfirmedIn: true,
                hasPaid: false
            })
        }
    })

    console.log('\n \n UPDATED playerGroup')
    console.log(playerGroup.playersTwo)
    console.log('LENGTH: ', playerGroup.playersTwo.length)

    const doc = await playerGroup.save();
    console.log('SAVED GROUP: ', doc)
    

    return 'RETURN'
    
}

// exports.confirmPlayersForKitty()