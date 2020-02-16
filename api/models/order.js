const mongoose = require('mongoose');

const userIdSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserId' },
});

module.exports = mongoose.model('UserId', userIdSchema);  