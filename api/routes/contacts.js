const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Contact = require('../models/contactSchema');

router.post('/', (req, res, next) => {
    const contactForm = new Contact ({
        _id: new  mongoose.Types.ObjectId(),  
        name: req.body.name,
        contactEmail: req.body.contactEmail,
        datail: req.body.detail
    });
    console.log(contactForm);
    contactForm.save().then(result => {
        res.status(201).json({
            message: "Thank you for your opinion"
        })
    })
    .catch(err => { 
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;