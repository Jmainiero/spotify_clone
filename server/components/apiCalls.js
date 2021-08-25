const axios = require('axios');

const getAllPlaylists = async (accessToken) => {
  try {
    const r = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      params: {
        limit: 50
      }
    });
    return r.data;

  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllPlaylists
};