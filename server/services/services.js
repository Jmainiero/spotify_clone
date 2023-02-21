const axios = require('axios');

const getUserDetails = async (accessToken) => {
    try {
        const r = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },

        });
        return r.data;

    } catch (e) {
        // console.log(e);
    }
};

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
        return r.data.items;

    } catch (e) {
        // console.log(e);
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
                seed_tracks: '69AIpwGNLxr4qS1X5ynx60',
                seed_atists: ['7dGJo4pcD2V6oG8kP0tJRR', '0BvkDsjIUla7X0k6CSWh1I', '5P5FTygHyx2G57oszR3Wot', '04gDigrS5kc9YWfZHwBETP'],
                seed_genre: ['country', 'pop', 'contemporary', 'rap'],
                limit: 25
            }
        });
        return ({
            name: "Just for You",
            description: 'Get better recommendations the more you listen.',
            data: r.data.tracks.sort(function (a, b) {
                return (a.name.toUpperCase() < b.name.toUpperCase()) ? -1 : (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : 0;
            })
        });
    } catch (e) {
        // console.log(e);
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
                limit: 50
            }
        });
        return ({
            name: "Jump Back In",
            data: r.data.items.map((e) => {
                return {
                    name: e.track.name, artists: e.track.artists, uri: e.track.uri, album: e.track.album
                }
            })
        });

    } catch (e) {
        // console.log(e);
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
                limit: 50
            }
        });
        return {
            name: 'Featured Playlists',
            description: 'What are others listening to.',
            data: r.data.playlists.items
        };

    } catch (e) {
        // console.log(e);
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
                limit: 50
            }
        });
        return r.data.items;

    } catch (e) {
        // console.log(e);
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
        return ({
            name: 'Default Playlists',
            data: k
        });

    } catch (e) {
        // console.log(e);
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
                limit: 50
            }
        });
        return ({
            name: 'New Releases',
            description: 'What\'s Trending',
            data: r.data.albums.items
        });

    } catch (e) {
        // console.log(e);
    }
};

const getTopCategories = async (accessToken) => {
    try {
        const r = await axios.get('https://api.spotify.com/v1/browse/categories', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });
        return r.data.categories.items;

    } catch (e) {
        // console.log(e);
    }
};

const getPlayerState = async (accessToken) => {
    try {
        const r = await axios.get('https://api.spotify.com/v1/me/player/', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });
        return {
            current_duration: r.data.progress_ms,
            song_length: r.data.item.duration_ms,
            song_title: r.data.item.name,
            song_artist: r.data.item.artists[0].name,
            song_cover: r.data.item.album.images[0].url
        };
    } catch (e) {
        // console.log(e);
    }
};

const changePlayerState = async (accessToken, state, spotifyURI = '') => {
    try {
        const config = {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }

        if (state === 'play' && spotifyURI !== '' && spotifyURI.indexOf('track') > -1) {
            config.data = {
                uris: [spotifyURI]
            }
        } else if (state === 'play' && spotifyURI !== '' && (spotifyURI.indexOf('album') > -1 || spotifyURI.indexOf('artist') > -1 )) {
            config.data = {
                context_uri: spotifyURI
            }
        }
        console.log(config)
        const r = await axios(`https://api.spotify.com/v1/me/player/${state}?device_id=ef7985c6ad03a74e9a359c462f9085bf410b76c9`, config)
        return r

    } catch (e) {
        // console.log(e);
    }
};

const skipToState = async (accessToken, state, spotifyURI = null) => {
    try {
        const r = await axios.post(`https://api.spotify.com/v1/me/player/${state}?device_id=ef7985c6ad03a74e9a359c462f9085bf410b76c9`, {}, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });
        return r

    } catch (e) {
        // console.log(e);
    }
};

module.exports = {
    getUserDetails,
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
    skipToState
};