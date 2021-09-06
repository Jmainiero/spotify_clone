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
    const r = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      params: {
        limit: 10
      }
    });
    return r.data.items;

  } catch (e) {
    console.log(e);
  }
};
const getFeaturedPlaylists = async (accessToken) => {
  try {
    const r = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      params: {
        limit: 20
      }
    });
    return r.data;

  } catch (e) {
    console.log(e);
  }
};
const getTopArtistsTracks = async (accessToken) => {
  try {
    const r = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    });
    console.log(r.data.items);
    return r.data.items;

  } catch (e) {
    console.log(e);
  }
};
const getDefaultPlaylists = async (accessToken) => {
  try {
    const r = await axios.get('https://api.spotify.com/v1/search?q=Discover', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }, 
      params: {
        'limit': 5,
        'type': 'playlist'
      }
    });
    const k = r.data.playlists.items.filter(e => {
      if (e.name.indexOf('Discover') > -1) return e;
    });
    console.log(k.forEach(e => console.log(e.name)));
    return k;

  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getAllPlaylists,
  getRecommended,
  getRecentlyPlayed,
  getFeaturedPlaylists,
  getTopArtistsTracks,
  getDefaultPlaylists
};