require('dotenv').config();
const express = require('express'); // Express web server framework
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const port = 8888;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.post("/login", (req, res) => {
  try {
    var scopes = ['user-read-private', 'user-read-email', 'user-library-modify', 'user-library-read', 'user-read-playback-state', 'user-modify-playback-state', 'streaming'];
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });
    const code = req.body.code;
    var authorizeURL = spotifyApi.createAuthorizeURL(scopes);
    spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
        res.json({
          accessToken: data.body.access_token,
          refreshToken: data.body.refresh_token,
          expiresIn: data.body.expires_in,
        })
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


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});