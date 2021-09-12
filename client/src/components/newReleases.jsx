export default function newReleases({ newReleases }) {
  return (
    <div className='recommended'>
      <div className='recommended--title'>
        <h1>New Releases</h1>
      </div>
      {newReleases.map((track, index) => {
        return (
          <a href={track.href} key={index}>
            <div className='recommended--block'>
              <div className='recommended--block__cover'>
                <img src={track.images[0].url} alt={track.name} />
              </div>
              <div className='recommended--block__title'>{track.name}</div>
              <div className='recommended--block__artist'>
                {track.artists[0].name}
              </div>
              <div className='recommended--block__desc'>
                {track.album_type.charAt(0).toUpperCase() + track.album_type.substr(1)}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
