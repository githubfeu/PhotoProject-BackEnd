const express = require('express');
const router = express.Router();


const User = require('../models/user');
const Contact = require('../models/contactSchema');

router.get('/:userId', (req, res, next) => {
    User.find({ id: req.body.id })
    .exec()
    .then ( user => {
        if (user < 1) {
            return res.status(401).json({
                message: 'User Not Found'
            })
        } else {
            for (let i = 0; i < user.length; i++) {
                const userId = JSON.stringify(req.params).slice(11, 35);
                if ( userId === user[i].id) {
                    console.log(user[i].id)
                    return res.status(200).json({
                        userProfile: user[i]
                    });
                }
            }
        }
        
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    });
});

router.get('/', (req, res, next) => {
    Contact.find()
    .exec()
    .then ( contact => {
        if (contact < 1) {
            return res.status(401).json({
                message: 'User Not Found'
            })
        } else {
            res.send(JSON.stringify({contact}));
        }
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    });
});

router.get('/image/:userId', (req, res, next) => {
    User.find({ id: req.body.id })
    .exec()
    .then ( user => {
        if (user < 1) {
            return res.status(401).json({
                message: 'User Not Found'
            })
        } else {
            for (let i = 0; i < user.length; i++) {
                const userId = JSON.stringify(req.params).slice(11, 35);
                if ( userId === user[i].id) {
                    console.log(user[i].id)
                    return res.status(200).json({
                        userImage: user[i].userImage
                    });
                }
            }
        }
        
    })
    .catch( err => {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    });
});



module.exports = router; 