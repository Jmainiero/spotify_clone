import { useState, useEffect } from 'react';
import useAuth from '../components/auth';
import SpotifyWebApi from 'spotify-web-api-node';
import Sidebar from '../components/sidebar';
import BottomBar from '../components/primaryBottomBar';
import MainView from '../components/mainView';

const axios = require('axios');

export default function Dashboard({ code }) {
  const spotifyApi = new SpotifyWebApi({
    clientId: '8b945ef10ea24755b83ac50cede405a0',
  });
  const accessToken = useAuth(code);
  const [playlists, setPlaylists] = useState();
  const [recommended, setRecommended] = useState();
  const [recentlyPlayed, setRecentlyPlayed] = useState();

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchPlaylists = async () => {
      try {
        const r = await axios.post('http://localhost:8888/playlists', {
          access_token: accessToken,
        });
        setPlaylists(r.data.items);
      } catch (e) {
        throw e;
      }
    };

    const fetchRecommended = async () => {
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
      try {
        const r = await axios.post('http://localhost:8888/recentlyPlayed', {
          access_token: accessToken,
        });
        setRecentlyPlayed(r.data);
      } catch (e) {
        throw e;
      }
    };
    fetchPlaylists();
    fetchRecommended();
    fetchRecentlyPlayed();
  }, [accessToken]);
  return (
    <div>
      <Sidebar playlists={playlists} />
      {recommended && recentlyPlayed ? <MainView recommended={recommended} recentlyPlayed={recentlyPlayed} /> : null}
      {accessToken ? <BottomBar accessToken={accessToken} /> : null}
    </div>
  );
}
