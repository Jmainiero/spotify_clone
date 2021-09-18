const sideNavPlaylist = ({ playlists }) => {
  return (
    <div className='sideNavPlaylist'>
      <div className='scrollable'>
        <ul>
          {playlists.map((playlist, index) => {
            return (
              <li key={index}>
                <a href={playlist.id}>{playlist.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default sideNavPlaylist;
