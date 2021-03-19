const mongoose = require('mongoose'); // import mongoose
const { Schema } = mongoose; // import 'define' Schema
const bcrypt = require('bcrypt');


const kittySchema = new Schema({
    name: {
        type: String,
    },
    // participants: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         required: true,
    //         ref: 'Player',
    //     }
    // ],
    playerGroup: {
        type: Schema.Types.ObjectId,
        ref: 'PlayerGroup',
        default: null
    },
    buyInAmount: {
        type: Number,
    },
    isClosed: { 
        type: Boolean, 
        default: false 
    },
    // noClosingDate: { 
    //     type: Boolean, 
    //     default: false 
    // },
    // closeDateTime: {
    //     type: Date,
    //     default: null
    // },
    user : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    dateCreated: {
        type: String,
        required: true,
        default: new Date().toISOString()
    },
    inviteId : {
        type: String
    }
});

kittySchema.pre('save', async function(next) {

    const kitty = this;

    if (!kitty.inviteId) {
        kitty.inviteId = await getKittyInviteId(kitty._id);
    }

    try 
    {
        next();
    } 
    catch(ex)
    {
        next(ex)
    }

});

const getKittyInviteId = async (kittyId) => {

    const encryptedId = await bcrypt.hash(`${kittyId}`, 10);
    const inviteId = encryptedId.replace(/\W/g, '');
    
    return inviteId.substring(0,30);
}

const Kitty = mongoose.model("Kitty", kittySchema);

module.exports = Kitty;
