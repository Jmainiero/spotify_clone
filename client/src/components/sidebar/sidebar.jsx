import { SideNavPrimary } from './SideNavPrimary';
import { SideNavPlaylist } from './SideNavPlaylist';
import Logo from '../../assests/Spotify_Logo_CMYK_White.png';

export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <img src={Logo} id='logo' alt='logo' />
      <SideNavPrimary />
      <SideNavPlaylist />
    </div>
  );
};
