export default function featuredPlaylists({ featuredPlaylists }) {
  return (
    <div className='recommended'>
      <div className='recommended--title'>
        <h1>Featured Playlists</h1>
      </div>
      {featuredPlaylists.map((track, index) => {
        return (
          <a href={track.href} key={index}>
            <div className='recommended--block'>
              <div className='recommended--block__cover'>
                <img src={track.images[0].url} alt={track.name} />
              </div>
              <div className='recommended--block__title'>{track.name}</div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
