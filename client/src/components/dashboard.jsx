import { useState, useEffect } from 'react';
import RingLoader from 'react-spinners/RingLoader';
import SpotifyWebApi from 'spotify-web-api-node';
import UserBar from '../components/userBar';
import Sidebar from '../components/sidebar/sidebar';
import BottomBar from '../components/primaryBottomBar';
import MainView from '../components/mainview/mainView';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylists } from '../redux/actions/sidebarActions';
const axios = require('axios');

export default function Dashboard() {
  const spotifyApi = new SpotifyWebApi({
    clientId: '8b945ef10ea24755b83ac50cede405a0',
  });
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.authTK);
  const [userDetails, setUserDetails] = useState();
  // const [playlists, setPlaylists] = useState();
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

    const fetchUser = async (user) => {
      try {
        const r = await axios.post('http://localhost:8888/fetchUser', {
          access_token: accessToken,
        });
        setUserDetails(r.data);
      } catch (e) {
        throw e;
      }
    };

    const fetchPlaylists = async () => {
      try {
        const r = await axios.post('http://localhost:8888/playlists', {
          access_token: accessToken,
        });
        dispatch(setPlaylists(r.data));
        // setPlaylists(r.data);
      } catch (e) {
        throw e;
      }
    };

    const masterFunction = async () => {
      try {
        const r = await axios.post('http://localhost:8888/master', {
          access_token: accessToken,
        });
        setMaster(r.data);
      } catch (e) {
        throw e;
      }
    };
    fetchUser();
    masterFunction();
    fetchPlaylists();
  }, [accessToken]);
  return (
    <div>
      {!userDetails && !master ? <RingLoader color={'#1ED760'} /> : null}
      {userDetails && master ? <UserBar userDetails={userDetails} /> : null}
      <Sidebar />
      {master ? <MainView master={master} handleClick={handleClick} /> : null}
      {accessToken ? (
        <BottomBar accessToken={accessToken} trackUri={trackUri} />
      ) : null}
    </div>
  );
}
