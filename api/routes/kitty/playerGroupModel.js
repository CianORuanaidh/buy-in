const mongoose = require('mongoose'); // import mongoose
const { Schema } = mongoose;

const gamePlayerSchema = new mongoose.Schema({
    player: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Player',
    },
    isInvited: {
        type: Boolean,
    },
    isConfirmedIn: {
        type: Boolean,
    },
    hasPaid: {
        type: Boolean,
    }
});

const playerGroupSchema = new Schema({
    name: {
        type: String,
    },
    players: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Player',
        },
    ],
    playersTwo: [ gamePlayerSchema ],
    user : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const PlayerGroup = mongoose.model("PlayerGroup", playerGroupSchema);

module.exports = PlayerGroup;