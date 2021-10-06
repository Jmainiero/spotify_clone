import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SideNavPlaylist = () => {
  const playlists = useSelector((state) => state.sidebar.sidebarPlaylists);
  return (
    <div className='sideNavPlaylist'>
      <div className='scrollable'>
        <ul>
          {playlists.map((playlist, index) => {
            return (
              <Link to={{ pathname: `/playlist/${playlist.id}` }} key={index}>
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

export default SideNavPlaylist;
