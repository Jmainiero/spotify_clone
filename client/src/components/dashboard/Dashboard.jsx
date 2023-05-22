import RingLoader from 'react-spinners/RingLoader';

import { Userbar } from '../userbar/UserBar';
import { Sidebar } from '../sidebar/Sidebar';
import { Bottombar } from '../bottomBar/Bottombar';
import { HomepageDisplay } from './HomepageDisplay';
import { useDispatch } from 'react-redux';
import { setPlayer, setPlaying } from '../../redux/actions/playerActions';

import { useAPIHandler } from '../util/apiHandler';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { master = [], userDetails = {} } = useAPIHandler()
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setPlayer(e.currentTarget.href));
    dispatch(setPlaying(true))
  };
  return (
    <div>
      <Sidebar />
      <div className="main-container">
        {!Object.keys(userDetails).length > 0 && !Object.keys(master).length > 0 ? <RingLoader color={'#1ED760'} /> : false}
        {Object.keys(userDetails).length > 0 ? <Userbar userDetails={userDetails} /> : false}
        {master.length > 0 ? <HomepageDisplay data={master} handleClick={handleClick} /> : false}
      </div>
      <Bottombar />
    </div>
  );
}
