const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

const upload = multer({dest: 'upload/'});

const PATH = './uploads';
const User = require('../models/user');


// router.post('/', upload.single('userImage'), (req, res, next) => {
//     const user = new User({
//         _id: new mongoose.Types.ObjectId(),
        
//     });
//     user
//     .save()
//     .then(result => {
//         console.log(result);
//         res.status(200).json({
//             message: 'Upload Complete',
//             image: {
//                 user: user
//             }
//         });
//     });
// });



module.exports = router; 