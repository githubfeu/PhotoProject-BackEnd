const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');

mongoose.connect('mongodb+srv://root:' + process.env.MONGO_ATLAS_PW + '@node-photo-gliwj.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true });


app.use(cors());
app.use(morgan('dev'));
app.use('/upload', express.static('upload'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const homeRoute = require('./api/routes/home');
const registerRoute = require('./api/routes/registers');
const userRoute = require('./api/routes/users');
const mainRoute = require('./api/routes/mains');
const contactRoute = require('./api/routes/contacts');
const updateRoute = require('./api/routes/update');

app.use('/home', homeRoute);
app.use('/register', registerRoute);
app.use('/signup', userRoute);
app.use('/main', mainRoute);
app.use('/contact', contactRoute);
app.use('/update', updateRoute);

// Upload // 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var upload = multer({storage: storage})

app.post('/file/:userId', upload.single('file'), (req, res , next) => {
    const file = req.file
    const userId = req.userId
    console.log(file.filename);
    if (!file) {
        const error = new Error('Please uplaod file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
});  

//

app.use('/', (req, res, next) => {
    res.status(200).json({
        message: 'It work!'
    });
});

app.use((req, res, next) => {
    const error = new Error ('Not found');
    error.status = 404;
    next(error); 
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});



module.exports = app;