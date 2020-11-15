const mongoose = require('mongoose'); // import mongoose
const { Schema } = mongoose; // import 'define' Schema

const kittySchema = new Schema({
    name: String,
    isClosed: { type: Boolean, default: false },
    participants: [String],
    buyInAmount: Number
});

const Kitty = mongoose.model("Kitty", kittySchema);

module.exports = Kitty;
