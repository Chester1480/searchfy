var express = require('express');
var router = express.Router();

const spotify = require('../service/spotify')

router.get('/', function(req, res, next) {
    res.render('spotify', {page:'spotify', menuId:'spotify'});
});

router.get('/newReleases', async function (req, res, next) {
    const { countryCode, limit, offset } = req.query;

    //判斷
    const data = await spotify.newReleases({ countryCode, limit, offset });
    res.json({
        data,
        message:"newReleases"
    });
});

router.get('/search', function(req, res, next) {
    console.log(11)
    return res.send({
        data:{},
        message:"test"
    });
});



module.exports = router;
