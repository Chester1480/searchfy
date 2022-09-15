var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('spotify', {page:'spotify', menuId:'spotify'});
});

router.post('/search', function(req, res, next) {
    console.log(11)
    return res.send({
        data:{},
        message:"test"
    });
});


module.exports = router;
