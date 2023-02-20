import { useState, useEffect } from 'react';
import RingLoader from 'react-spinners/RingLoader';
import UserBar from '../components/userBar';
import Sidebar from '../components/sidebar/sidebar';
import BottomBar from '../components/primaryBottomBar';
import MainView from '../components/mainview/mainView';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylists } from '../redux/actions/sidebarActions';
import { setPlayer, setPlaying } from '../redux/actions/playerActions';
const axios = require('axios');

export default function Dashboard() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessTK);
  const [userDetails, setUserDetails] = useState();
  const [trackUri, setTrackUri] = useState();
  const [master, setMaster] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    setTrackUri(e.currentTarget.href);
    console.log(e.currentTarget.href)
    dispatch(setPlayer(e.currentTarget.href));
    dispatch(setPlaying(true))
  };

  useEffect(() => {
    if (!accessToken) return;

    (async () => {
        try {
          const user = await axios.post('/fetchUser', {
            access_token: accessToken,
          });
          setUserDetails(user.data);
          const playlist = await axios.post('/playlists', {
            access_token: accessToken,
          });
          dispatch(setPlaylists(playlist.data));
          const master = await axios.post('/master', {
            access_token: accessToken,
          });
          setMaster(master.data);
        } catch (e) {
          throw e;
        }
    })()

  }, [accessToken]);
  return (
    <div>
      {!userDetails && !master ? <RingLoader color={'#1ED760'} /> : null}
      {userDetails && master ? <UserBar userDetails={userDetails} /> : null}
      <Sidebar />
      {master ? <MainView master={master} handleClick={handleClick} /> : null}
        <BottomBar/>
    </div>
  );
}
