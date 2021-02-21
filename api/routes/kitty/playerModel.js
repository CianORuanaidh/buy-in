const mongoose = require('mongoose'); // import mongoose
const { Schema } = mongoose;

const playerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;