const mongoose = require('mongoose'); // import mongoose
const { Schema } = mongoose; // import 'define' Schema

const kittySchema = new Schema({
    name: {
        type: String,
    },
    isClosed: { 
        type: Boolean, 
        default: false 
    },
    participants: {
        type: [String],
    },
    buyInAmount: {
        type: Number,
    },
    user : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const Kitty = mongoose.model("Kitty", kittySchema);

module.exports = Kitty;
