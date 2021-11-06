import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const SideNavPlaylist = () => {
  const playlists = useSelector((state) => state.sidebar.sidebarPlaylists);
  return (
    <div className='sideNavPlaylist'>
      <div className='scrollable'>
        <ul>
          {playlists.map((playlist, index) => {
            const { id } = playlist;
            return (
              <Link to={`/playlist/${id}`} key={id}>
                <li>
                  <p className='sideNavPlaylist--p'>{playlist.name}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default withRouter(SideNavPlaylist);
