const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({storage: storage, 
    imits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}); 

const User = require('../models/user');

router.post('/validation', (req, res ,next) => { 
    User.find({ email: req.body.email })
    .exec()
    .then( user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Email already exists' 
            });
        } else { 
            return res.status(201).json({
                message: 'Email Correct'
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            error: err
        })
    })
})

router.post('/', upload.single('userImage'), (req, res, next) => {
    console.log(req.file); 
    User.find({ email: req.body.email })
    .exec()
    .then( user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Email already exists'
            });
        } else {
            const userId = new User({
                _id: new mongoose.Types.ObjectId(),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                userImage: ""
            });
            userId.save()
            .then( result => {
                console.log(result.id.toString());
                res.status(201).json({
                    message: 'Register Complete',
                    user: userId
                });
            })
            .catch( err => {
                console.log(err); 
                res.status(500).json({
                    message: 'Register Falied'
                });
            })
        }
    })
});

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email, password: req.body.password })
    .exec()
    .then( user => {
        if (user.length < 1){
            return res.status(401).json({
                message: 'Auth Failed Ja'
            });
        }
        if ( user ) {
            return res.status(200).json({
                user: user[0]._id
            })
        } else {
            return res.status(401).json({
                message: 'Login Falied'
            })
        }
    }).catch( err => {
        console.log(err);
        return res.status(500).json({
            message: 'Login Falied'
        });
    });
});

// router.post('/', (req, res, next ) => {
//     User.find({ email: req.body.email })
//     .exec()
//     .then( user => {
//         if (user.length >= 1) {
//             return res.status(409).json({
//                 message: 'Email already exists'
//             });
//         } else {
//         bcrypt.hash(req.body.password, 10, (err, hash) => {
//             if (err) {
//             return res.status(500).json({
//                 error: err,
//                 message: 'Hash Error'
//                 });
//             } else {
//             const user = new User({
//                 _id: new mongoose.Types.ObjectId(),
//                 firstname: req.body.firstname,
//                 lastname: req.body.lastname,
//                 email: req.body.email,
//                 password: req.body.password
//                 });
//                 user.save()
//                 .then( result => {
//                     console.log(result);
//                     res.status(201).json({
//                         message: 'Register Complete',
//                     });
//                 })
//                 .catch( err => {
//                     console.log( err);
//                     res.status(500).json({
//                         error: err,
//                         message: 'Register Failed'
//                     });
//                 })
//             }
//         });
//         }
//     }) 
//     .catch();
// });

router.delete('/:userId', (req, res, next) => {
    User.remove({ id: req.params.userId }).exec()
    .then( result => {
        result.status(200).json({
            message: "User deleted"
        });
    })
    .catch( err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router; 