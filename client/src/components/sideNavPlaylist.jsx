const sideNavPlaylist = ({ playlists }) => {
  return (
    <div className='sideNavPlaylist'>
      {/* <h3>Your Library</h3> */}
      <div className='scrollable'>
        <ul>
          {playlists.map((playlist, index) => {
            return (
              <li key={index}>
                <a href={playlist.href}>{playlist.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default sideNavPlaylist;
