const mongoose = require('mongoose'); // import mongoose
const { Schema } = mongoose; // import 'define' Schema

const kittySchema = new Schema({
    name: {
        type: String,
    },
    participants: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Player',
        }
    ],
    buyInAmount: {
        type: Number,
    },
    isClosed: { 
        type: Boolean, 
        default: false 
    },
    noClosingDate: { 
        type: Boolean, 
        default: false 
    },
    closeDateTime: {
        type: Date,
        default: null
    },
    user : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Kitty = mongoose.model("Kitty", kittySchema);

module.exports = Kitty;
