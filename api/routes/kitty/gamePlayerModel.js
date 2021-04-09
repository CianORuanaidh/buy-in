const mongoose = require('mongoose'); // import mongoose
const { Schema } = mongoose;

const gamePlayerSchema = new Schema({
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
})

const gamePlayerSchema = mongoose.model("GamePlayer", gamePlayerSchema);

module.exports = gamePlayerSchema;