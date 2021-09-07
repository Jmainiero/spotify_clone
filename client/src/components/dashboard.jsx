import { useState, useEffect } from 'react';
import useAuth from '../components/auth';
import SpotifyWebApi from 'spotify-web-api-node';
import Sidebar from '../components/sidebar';
import BottomBar from '../components/primaryBottomBar';
import MainView from '../components/mainView';

const axios = require('axios');

export default function Dashboard({ code }) {
  console.log(code);
  const spotifyApi = new SpotifyWebApi({
    clientId: '8b945ef10ea24755b83ac50cede405a0',
  });
  const accessToken = useAuth(code);
  const [playlists, setPlaylists] = useState();
  const [recommended, setRecommended] = useState();
  const [recentlyPlayed, setRecentlyPlayed] = useState();
  const [featuredPlaylists, setFeaturedPlaylists] = useState();
  const [defaultPlaylists, setDefaultPlaylists] = useState();
  const [newReleases, setnewReleases] = useState();
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    console.log(accessToken);
    if (!accessToken) return;

    const fetchPlaylists = async () => {
      try {
        console.log('Calling 1');
        const r = await axios.post('http://localhost:8888/playlists', {
          access_token: accessToken,
        });
        setPlaylists(r.data.items);
      } catch (e) {
        throw e;
      }
    };

    const fetchRecommended = async () => {
      console.log('Calling 2');
      try {
        const r = await axios.post('http://localhost:8888/recommended', {
          access_token: accessToken,
        });
        setRecommended(r.data);
      } catch (e) {
        throw e;
      }
    };
    const fetchRecentlyPlayed = async () => {
      console.log('Calling 3');
      try {
        const r = await axios.post('http://localhost:8888/recentlyPlayed', {
          access_token: accessToken,
        });
        setRecentlyPlayed(r.data);
      } catch (e) {
        throw e;
      }
    };
    const fetchFeaturedPlaylists = async () => {
      console.log('Calling 4');
      try {
        const r = await axios.post('http://localhost:8888/getFeatured', {
          access_token: accessToken,
        });
        setFeaturedPlaylists(r.data.playlists.items);
      } catch (e) {
        throw e;
      }
    };

    const fetchDefaultPlaylists = async () => {
      console.log('Calling 5');
      try {
        const r = await axios.post('http://localhost:8888/defaultPlaylists', {
          access_token: accessToken,
        });
        setDefaultPlaylists(r.data);
      } catch (e) {
        throw e;
      }
    };
    const fetchNewReleases = async () => {
      console.log('Calling 6');
      try {
        const r = await axios.post('http://localhost:8888/getNewReleases', {
          access_token: accessToken,
        });
        setnewReleases(r.data);
      } catch (e) {
        throw e;
      }
    };
    const fetchTopArtists = async () => {
      console.log('Calling 7');
      try {
        const r = await axios.post('http://localhost:8888/getTopArtistTrack', {
          access_token: accessToken,
        });
        console.log(r.data);
      } catch (e) {
        throw e;
      }
    };
    fetchPlaylists();
    fetchRecommended();
    fetchRecentlyPlayed();
    fetchFeaturedPlaylists();
    fetchDefaultPlaylists();
    fetchNewReleases();
    fetchTopArtists();
  }, [accessToken]);
  return (
    <div>
      <Sidebar playlists={playlists} />
      {recommended &&
      recentlyPlayed &&
      featuredPlaylists &&
      defaultPlaylists &&
      newReleases ? (
        <MainView
          recommended={recommended}
          recentlyPlayed={recentlyPlayed}
          featuredPlaylists={featuredPlaylists}
          defaultPlaylists={defaultPlaylists}
          newReleases={newReleases}
        />
      ) : null}
      {accessToken ? <BottomBar accessToken={accessToken} /> : null}
    </div>
  );
}
