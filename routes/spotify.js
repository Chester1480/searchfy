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
    res.render('search', {page:'search', menuId:'search'});
});

router.post('/search', function(req, res, next) {
    
});

/**
 * 取得目前有分類的類型
 */
router.get('/availableGenreSeeds', async function(req, res, next) {
    const data = await spotify.availableGenreSeeds();
    res.json({
        data,
        message:"availableGenreSeeds"
    });
});

/**
 * 
 */
 router.get('/categories', async function(req, res, next) {
    const { country ,locale,limit, offset }  = req.query;
    const data = await spotify.categories({ country ,locale,limit, offset });
    res.json({
        data,
        message:"categories"
    });
});





module.exports = router;
