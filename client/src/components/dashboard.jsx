import { useState, useEffect } from 'react';
import useAuth from '../components/auth';
import SpotifyWebApi from 'spotify-web-api-node';
import Sidebar from '../components/sidebar/sidebar';
import BottomBar from '../components/primaryBottomBar';
import MainView from '../components/mainview/mainView';
const axios = require('axios');

export default function Dashboard({ code }) {
  const spotifyApi = new SpotifyWebApi({
    clientId: '8b945ef10ea24755b83ac50cede405a0',
  });
  const accessToken = useAuth(code);
  const [playlists, setPlaylists] = useState();
  const [trackUri, setTrackUri] = useState();
  const [master, setMaster] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    setTrackUri(e.currentTarget.href);
  };

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
        setPlaylists(r.data);
      } catch (e) {
        throw e;
      }
    };

    const masterFunction = async () => {
      try {
        const r = await axios.post('http://localhost:8888/master', {
          access_token: accessToken,
        });
        console.log(r.data);
        setMaster(r.data);
      } catch (e) {
        throw e;
      }
    };
    masterFunction();
    fetchPlaylists();
  }, [accessToken]);
  return (
    <div>
      <Sidebar playlists={playlists} />
      {console.log(master)}
      {master ? <MainView master={master} handleClick={handleClick} /> : null}
      {accessToken ? (
        <BottomBar accessToken={accessToken} trackUri={trackUri} />
      ) : null}
    </div>
  );
}
