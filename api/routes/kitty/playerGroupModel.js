const mongoose = require('mongoose'); // import mongoose
const { Schema } = mongoose;

const playerGroupSchema = new Schema({
    name: {
        type: String,
    },
    players: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Player',
        }
    ],
    user : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const PlayerGroup = mongoose.model("PlayerGroup", playerGroupSchema);

module.exports = PlayerGroup;