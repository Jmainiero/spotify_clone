import { useState, useEffect } from 'react';
import useAuth from '../components/auth';
import SpotifyWebApi from 'spotify-web-api-node';
import Sidebar from '../components/sidebar';
// import Player from '../components/primaryBottomBar';
export default function Dashboard({ code }) {
  const spotifyApi = new SpotifyWebApi({
    clientId: '8b945ef10ea24755b83ac50cede405a0',
  });
  const accessToken = useAuth(code);
  const [playlists, setPlaylists] = useState();

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    const fetchAPI = async () => {
      try {
        const r = await spotifyApi.getUserPlaylists('1238207050');
        setPlaylists(r.body.items);
      } catch (e) {
        throw e;
      }
    };
    fetchAPI();
  }, [accessToken]);
  return (
    <div>
      <Sidebar playlists={playlists} />
      {/* <Player /> */}
    </div>
  );
}
