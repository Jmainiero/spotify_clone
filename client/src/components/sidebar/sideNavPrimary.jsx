import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
const sideNavPrimary = () => {
  return (
    <div className='sideNavPrimary'>
      <ul>
        <li>
          <Link to='/home'>
            <HomeIcon fontSize='medium' />
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link to='/browse'>
            <SearchIcon fontSize='medium' />
            <p>Browse</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default sideNavPrimary;
