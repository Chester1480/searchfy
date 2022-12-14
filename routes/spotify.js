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

/**
 * 
 */
 router.get('/getNewReleasesAndTrack', async function(req, res, next) {
    const { code, limit, offset } = req.query;
    const data = await spotify.newReleases({ code, limit, offset });
    let newReleases = new Map();
    data.albums.items.forEach(album => {
        newReleases.set(
            album.id,
            {
                albumId:album.id,
                albumArtists:album.artists,
                albumName:album.name,
                totalTracks:album.total_tracks,
                releaseDate:album.release_date,
                albumType:album.album_type,
                externalUrls:album.external_urls.spotify,
                albumImages:album.images,
                albumTrack:[]
            }
        )
    });

    let ids = data.albums.items.map(tracks =>{
        return tracks.id;
    });

    const albumIds = ids.join(',');
    const albumsResult = await spotify.albums(code,albumIds);

    // albumsResult.albums.forEach(item => {
    //     let release = newReleases.get(item.id);
    //     release.albumTrack = item.tracks.items.preview_url
    //     newReleases.set(item.id,release);
    // })
    //console.log(newReleases.get('1WMh0LAOyEUgcHYT3nHYhc').albumTrack.items);
    res.json({
        data:albumsResult,
        message:"getNewReleasesAndTrack"
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

/**
 * 
 */
 router.get('/getGlobalTop', async function(req, res, next) {
    const {  }  = req.query;
    const data = await spotify.getGlobalTop();
    res.json({
        data,
        message:"getGlobalTop"
    });
});






module.exports = router;
