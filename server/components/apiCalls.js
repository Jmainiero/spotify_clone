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

const getRecommended = async (accessToken) => {
  try {
    console.log(accessToken);
    const r = await axios.get('https://api.spotify.com/v1/recommendations', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      params: {
        seed_tracks: '08ir631EiCA7xIms7JDp15',
        seed_atists: '7dGJo4pcD2V6oG8kP0tJRR',
        seed_genre: 'country'
      }
    });
    return r.data;

  } catch (e) {
    console.log(e);
  }
};
const getRecentlyPlayed = async (accessToken) => {
  try {
    console.log(accessToken);
    const r = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
    });
    return r.data.items;

  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllPlaylists,
  getRecommended,
  getRecentlyPlayed
};