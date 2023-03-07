const axios = require('axios');

const getUserDetails = async () => {
    try {
        const r = await axios.get('https://api.spotify.com/v1/me');
        return r.data;

    } catch (e) {
        console.log(e);
    }
};

const getAllPlaylists = async () => {
    try {
        const r = await axios.get('https://api.spotify.com/v1/me/playlists', {
            params: {
                limit: 50
            }
        });
        return r.data.items;

    } catch (e) {
        console.log(e);
    }
};

const getRecommended = async () => {
    try {
        const r = await axios.get('https://api.spotify.com/v1/recommendations', {
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
        console.log(e);
    }
};

const getRecentlyPlayed = async () => {
    try {
        const r = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
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
        console.log(e);
    }
};

const getFeaturedPlaylists = async () => {
    try {
        const r = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
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
        console.log(e);
        return e;
    }
};

const getTopArtistsTracks = async () => {
    try {
        const r = await axios.get('https://api.spotify.com/v1/me/top/artists', {
            params: {
                limit: 50
            }
        });
        return r.data.items;

    } catch (e) {
        console.log(e);
        return e;
    }
};

const getDefaultPlaylists = async () => {
    try {
        const r = await axios.get('https://api.spotify.com/v1/search?q=Daily%20Mix', {
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
        console.log(e);
        return e;
    }
};

const getNewReleases = async () => {
    try {
        const r = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
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
        console.log(e);
        return e;
    }
};

const getTopCategories = async () => {
    try {
        const r = await axios.get('https://api.spotify.com/v1/browse/categories');
        return r.data.categories.items;

    } catch (e) {
        console.log(e);
    }
};

const getPlayerState = async () => {
    try {
        const r = await axios.get('https://api.spotify.com/v1/me/player/');
        if (r.data.length === 0) return 'No Data'
        return {
            current_duration: r.data.progress_ms || 0,
            song_length: r.data.item.duration_ms || 0,
            song_title: r.data.item.name || '',
            song_artist: r.data.item.artists[0].name || '',
            song_cover: r.data.item.album.images[0].url || ''
        };
    } catch (e) {
        console.log(e);
        return e;
    }
};

const changePlayerState = async (state, spotifyURI = '', device = '') => {
    try {
        const config = {
            method: 'put'
        }
        if (state === 'play' && spotifyURI !== '' && spotifyURI.indexOf('track') > -1) {
            config.data = {
                uris: [spotifyURI]
            }
        } else if (state === 'play' && spotifyURI !== '' && (spotifyURI.indexOf('album') > -1 || spotifyURI.indexOf('artist') > -1)) {
            config.data = {
                context_uri: spotifyURI
            }
        }
        const r = await axios(`https://api.spotify.com/v1/me/player/${state}?device_id=${device}`, config)
        return r

    } catch (e) {
        if (e.response.status === 404) {
            throw ({
                code: e.response.status,
                msg: e.response.statusText
            });
        }
        throw new Error(e)

    }
};

const skipToState = async (state, spotifyURI = null) => {
    try {
        const r = await axios.post(`https://api.spotify.com/v1/me/player/${state}?device_id=ef7985c6ad03a74e9a359c462f9085bf410b76c9`);
        return r

    } catch (e) {
        // console.log(e);
        return e;
    }
};
const getDevices = async (state, spotifyURI = null) => {
    try {
        const r = await axios.get(`https://api.spotify.com/v1/me/player/devices`);
        return r.data.devices
    } catch (e) {
        console.log(e);
        // return e;
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
    skipToState,
    getDevices
};