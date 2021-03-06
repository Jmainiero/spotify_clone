require('dotenv').config();
const express = require('express'); // Express web server framework
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const apiCalls = require('./components/apiCalls');
const port = 8888;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post("/login", (req, res) => {
  try {
    var scopes = ['user-read-private', 'user-read-email', 'user-library-modify', 'user-library-read', 'user-read-playback-state', 'user-modify-playback-state', 'streaming', 'playlist-read-private', 'playlist-read-collaborative', 'user-read-recently-played', 'user-top-read'];
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });
    const code = req.body.code;

    var authorizeURL = spotifyApi.createAuthorizeURL(scopes);
    // console.log(authorizeURL);
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
        console.log(err);
        res.sendStatus(400);
      })
  } catch (e) {
    console.log(e);
  }

});

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch(err => {
      res.sendStatus(400);
    })
});


app.post('/master', async (req, res) => {
  const r = [];
  r.push(await apiCalls.getRecommended(req.body.access_token));
  r.push(await apiCalls.getNewReleases(req.body.access_token));
  r.push(await apiCalls.getFeaturedPlaylists(req.body.access_token));
  r.push(await apiCalls.getRecentlyPlayed(req.body.access_token));
  res.status(200).send(r);
});

app.post('/fetchPlaylist', async (req, res) => {
  const r = await apiCalls.getPlaylist(req.body.access_token, req.body.playlistId);
  res.status(200).send(r);
})
app.post('/fetchUser', async (req, res) => {
  const r = await apiCalls.getUserDetails(req.body.access_token);
  res.status(200).send(r);
})

app.post('/playlists', async (req, res) => {
  const r = await apiCalls.getAllPlaylists(req.body.access_token);
  res.status(200).send(r);
})

app.post('/recommended', async (req, res) => {
  const r = await apiCalls.getRecommended(req.body.access_token);
  res.status(200).send(r);
});
app.post('/recentlyPlayed', async (req, res) => {
  const r = await apiCalls.getRecentlyPlayed(req.body.access_token);
  res.status(200).send(r);
});
app.post('/defaultPlaylists', async (req, res) => {
  const r = await apiCalls.getDefaultPlaylists(req.body.access_token);
  res.status(200).send(r);
});
app.post('/getFeatured', async (req, res) => {
  const r = await apiCalls.getFeaturedPlaylists(req.body.access_token);
  res.status(200).send(r);
});
app.post('/getTopArtistTrack', async (req, res) => {
  const r = await apiCalls.getTopArtistsTracks(req.body.access_token);
  res.status(200).send(r);
});
app.post('/getNewReleases', async (req, res) => {
  const r = await apiCalls.getNewReleases(req.body.access_token);
  res.status(200).send(r);
});
app.post('/getTopCategories', async (req, res) => {
  const r = await apiCalls.getTopCategories(req.body.access_token);
  res.status(200).send(r);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
}).on('error', function (err) {
  console.log(err)
});