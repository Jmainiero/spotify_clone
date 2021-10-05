import SideNavPrimary from './sideNavPrimary';
import SideNavPlaylist from './sideNavPlaylist';
import Logo from '../../assests/Spotify_Logo_CMYK_White.png';

const sidebar = () => {
  return (
    <div className='sidebar'>
      <img src={Logo} id='logo' alt='logo' />
      <SideNavPrimary />
      <SideNavPlaylist />
    </div>
  );
};

export default sidebar;
