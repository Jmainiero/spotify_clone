require('dotenv').config();
const express = require("express");
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const { getUserDetails,
    getAllPlaylists,
    getRecommended,
    getRecentlyPlayed,
    getFeaturedPlaylists,
    getTopArtistsTracks,
    getDefaultPlaylists,
    getNewReleases,
    getTopCategories,
    getPlayerState,
    changePlayerState,
    skipToState } = require("../services/services");

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

router.post("/login", (req, res, next) => {
    try {
        var scopes = ['user-read-private', 'user-read-email', 'user-library-modify', 'user-library-read', 'user-read-playback-state', 'user-modify-playback-state', 'streaming', 'playlist-read-private', 'playlist-read-collaborative', 'user-read-recently-played', 'user-top-read'];
        const spotifyApi = new SpotifyWebApi({
            redirectUri: process.env.REDIRECT_URI,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        });
        const code = req.body.code;
        console.log(code)
        var authorizeURL = spotifyApi.createAuthorizeURL(scopes);
        spotifyApi
            .authorizationCodeGrant(code)
            .then(data => {
                res.json({
                    accessToken: data.body.access_token,
                    refreshToken: data.body.refresh_token,
                    expiresIn: data.body.expires_in,
                });
            })
            .catch(err => {
                res.sendStatus(400);
            })
    } catch (e) {
        console.log(e);
        return next(new Error(e));
    }

});

router.post('/token', async (req, res, next) => {
    try {
        const { code } = req.body || null
        const spotifyApi = new SpotifyWebApi({
            redirectUri: process.env.REDIRECT_URI,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        })
        const r = await spotifyApi.authorizationCodeGrant(code)
        res.json({
            refresh_token: r.body.refresh_token,
            expires_in: r.body.expires_in,
            access_token: r.body.access_token
        })
    } catch (e) {
        console.log(e)
        return next(new Error(e));
    }

});

router.post("/refresh", (req, res, next) => {
    console.log('Refreshing Token', req.body.refreshToken)
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: refreshToken,
    });

    spotifyApi
        .refreshAccessToken()
        .then(data => {
            console.log(data)
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in,
            })
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400);
            return next(new Error(e));
        })
});

router.post('/master', async (req, res, next) => {
    try {
        const r = [];
        r.push(await getRecommended());
        r.push(await getNewReleases());
        r.push(await getFeaturedPlaylists());
        r.push(await getRecentlyPlayed());
        res.status(200).send(r);
    } catch (e) {
        // console.log(e)
        return next(new Error(e));
    }
});

router.post('/fetchUser', async (req, res, next) => {
    try {
        const r = await getUserDetails();
        res.status(200).send(r);
    } catch (e) {
        console.log(e)
        return next(new Error(e));
    }
})

router.post('/playlists', async (req, res, next) => {
    try {
        const r = await getAllPlaylists();
        res.status(200).send(r);
    } catch (e) {
        console.log(e)
        return next(new Error(e));
    }
})

router.post('/recommended', async (req, res, next) => {
    try {
        const r = await getRecommended();
        res.status(200).send(r);
    } catch (e) {
        console.log(e)
        return next(new Error(e));
    }
});

router.post('/recentlyPlayed', async (req, res, next) => {
    try {
        const r = await getRecentlyPlayed();
        res.status(200).send(r);
    } catch (e) {
        console.log(e)
        return next(new Error(e));
    }
});

router.post('/defaultPlaylists', async (req, res, next) => {
    try {
        const r = await getDefaultPlaylists();
        res.status(200).send(r);
    } catch (e) {
        console.log(e)
        return next(new Error(e));
    }
});

router.post('/getFeatured', async (req, res, next) => {
    try {
        const r = await getFeaturedPlaylists();
        res.status(200).send(r);
    } catch (e) {
        console.log(e)
        return next(new Error(e));
    }
});

router.post('/getTopArtistTrack', async (req, res, next) => {
    try {
        const r = await getTopArtistsTracks();
        res.status(200).send(r);
    } catch (e) {
        console.log(e)
        return next(new Error(e));
    }
});

router.post('/getNewReleases', async (req, res, next) => {
    try {
        const r = await getNewReleases();
        res.status(200).send(r);
    } catch (e) {
        console.log(e)
        return next(new Error(e));
    }
});

router.post('/getTopCategories', async (req, res, next) => {
    try {
        const r = await getTopCategories();
        res.status(200).send(r);
    } catch (e) {
        console.log(e)
        return next(new Error(e));
    }
});

router.post('/getPlayerState', async (req, res, next) => {
    try {
        const r = await getPlayerState();
        res.status(200).send(r);
    } catch (e) {
        console.log(e)
        return next(new Error(e));
    }
});

router.post('/changePlayerState', async (req, res, next) => {
    try {
        const { state, spotifyURI } = req.body
        if (!state) return next('Please Enter a valid player state.'); 
        await changePlayerState(state, spotifyURI);
        
        //Delay is necessary to await allow Spotify to "Play" the track. If this is not delayed, we will not have any meta-data to return to the client.
        await delay(1000)

        const getPlayerDetails = await getPlayerState(); 
        res.status(200).json({
            getPlayerDetails
        });
    } catch (e) {
        // console.log(e)
        return next(new Error(e));
    }
});

router.post('/skipToState', async (req, res, next) => {
    try {
        const { state } = req.body
        if (!state) return next('Please Enter a valid player state.'); 
        await skipToState(state);

        //Delay is necessary to await allow Spotify to "Play" the track. If this is not delayed, we will not have any meta-data to return to the client.
        await delay(1000)
        
        const getPlayerDetails = await getPlayerState(); 
        res.status(200).json({
            getPlayerDetails
        });
    } catch (e) {
        console.log(e)
        return next(new Error(e));
    }
});
module.exports = router;


