const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userIdSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: { type: String, required: true}, 
    lastname: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    userImage: {type: String}
});

module.exports = mongoose.model('UserId', userIdSchema); 