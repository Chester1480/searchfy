var express = require('express');
var router = express.Router();
const { lrucache } = require('../service/share/exports');

const spotify = require('../service/spotify')

router.get('/', function(req, res, next) {
    res.render('spotify', {page:'spotify', menuId:'spotify'});
});

router.get('/newReleases', async function (req, res, next) {
    const { code, limit, offset } = req.query;
    //判斷
    const data = await spotify.newReleases({ code, limit, offset });
    res.json({
        data,
        message:"newReleases"
    });
});

router.get('/search', function(req, res, next) {
    console.log('search')
    res.render('search', {page:'search', menuId:'search'});
});



module.exports = router;
