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
        seed_tracks: ['4AU7z13HYmPMetlWbq1mys', '69AIpwGNLxr4qS1X5ynx60', '7sapKrjDij2fpDVj0GxP66'],
        seed_atists: ['7dGJo4pcD2V6oG8kP0tJRR', '0BvkDsjIUla7X0k6CSWh1I', '5P5FTygHyx2G57oszR3Wot', '04gDigrS5kc9YWfZHwBETP'],
        seed_genre: ['country', 'pop', 'contemporary', 'rap'],
        limit: 100
      }
    });
    console.log(r.data)
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
        limit: 14
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
        limit: 14
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
      },
      params: {
        limit: 14
      }
    });
    return r.data.items;

  } catch (e) {
    console.log(e);
  }
};
const getDefaultPlaylists = async (accessToken) => {
  try {
    const r = await axios.get('https://api.spotify.com/v1/search?q=Daily%20Mix', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      params: {
        'type': 'playlist'
      }
    });
    const k = r.data.playlists.items.filter(e => {
      if (e.name.indexOf('Daily') > -1 && e.owner.display_name.indexOf('Spotify') > -1) return e;
    });
    // console.log(k.forEach(e => console.log(e.name)));
    return k;

  } catch (e) {
    console.log(e);
  }
};
const getNewReleases = async (accessToken) => {
  try {
    const r = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      params: {
        limit: 14
      }
    });
    return r.data.albums.items;

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
  getDefaultPlaylists,
  getNewReleases
};