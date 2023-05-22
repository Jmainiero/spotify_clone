import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';

export const SideNavPrimary = () => {
  return (
    <div className='sideNavPrimary'>
        <ul className="navigation-list">
          <li>
            <HomeIcon fontSize='medium' />
            <a href='#'>Home</a>
          </li>
          <li>
            <SearchIcon fontSize='medium' />
            <a href='#'>Browse</a>
          </li>
        </ul>
      <div className="divider"></div>
      </div>
  );
};
