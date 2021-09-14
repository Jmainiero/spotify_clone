import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
const sideNavPrimary = () => {
  return (
    <div className='sideNavPrimary'>
      <ul>
        <li>
          <HomeIcon fontSize='medium' />
          <a href='Home'>Home</a>
        </li>
        <li>
          <SearchIcon fontSize='medium' />
          <a href='Browse'>Browse</a>
        </li>
      </ul>
    </div>
  );
};

export default sideNavPrimary;
