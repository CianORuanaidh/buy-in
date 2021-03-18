const mongoose = require('mongoose'); // import mongoose
const { Schema } = mongoose; // import 'define' Schema

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
    }
});

const Kitty = mongoose.model("Kitty", kittySchema);

module.exports = Kitty;
