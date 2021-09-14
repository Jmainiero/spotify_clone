import SideNavPrimary from './sideNavPrimary';
import SideNavPlaylist from './sideNavPlaylist';
import Logo from '../../assests/Spotify_Logo_CMYK_White.png';

const sidebar = ({ playlists }) => {
  return (
    <div className='sidebar'>
      <img src={Logo} id='logo' alt='logo' />
      <SideNavPrimary />
      {playlists ? <SideNavPlaylist playlists={playlists} /> : null}
    </div>
  );
};

export default sidebar;
