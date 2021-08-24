import SideNavPrimary from './sideNavPrimary';
import SideNavPlaylist from './sideNavPlaylist';
const sidebar = ({ playlists }) => {
  return (
    <div className='sidebar'>
      <SideNavPrimary />
      {playlists ? <SideNavPlaylist playlists={playlists} /> : null}
    </div>
  );
};

export default sidebar;
