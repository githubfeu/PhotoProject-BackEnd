const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    contactEmail: { type: String, required: true},
    datail: { type: String, required: true}
});

module.exports = mongoose.model('contactForm', contactSchema);  