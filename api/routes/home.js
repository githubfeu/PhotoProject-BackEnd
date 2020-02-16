const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "GET From Home"
    })
    return;
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "POST From Home"
    })
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    if(id === 'admin') {
        res.status(200).json({
            message: 'You are a Admin',
            id: id });
        }  else {
            res.status(200).json({
                message: 'You passed some Id'
            });
    };
})


module.exports = router;