const express = require('express');
const router = express.Router();


const User = require('../models/user');

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

router.post('/:userId', (req, res, next) => {
    User.findById(req.params.userId, (err, user) => {
        if (!user) {
            res.send({message: "Something Were Wrong!"});
        }

        let email = req.body.email
        let firstname = req.body.firstname
        let lastname = req.body.lastname

        user.email = email
        user.firstname = req.body.firstname
        user.lastname = req.body.lastname

        user.save();
        res.send({message: "Update Complete"})

        console.log(email, firstname, lastname);
    })
    
})

// router.put('/:userId', async (req, res, next) => {
//     let user 
//     res.send({req: req.body.firstname});
//     user = await User.findById(req.params.params) 
//     if (user.email !== req.body.email) {
//         user.email = req.body.email
//         user.firstname = req.body.firstname
//         user.lastname = req.body.lastname
//         await user.save();
//     } else {
//         res.status(401).json({
//             message: 'It already exists'
//         })
//     }
//     res.send({message: "Update Complete"});
//     console.log(user);
// });

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