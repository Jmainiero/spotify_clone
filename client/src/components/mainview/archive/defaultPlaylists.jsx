export default function defaultPlaylists({ defaultPlaylists }) {
  return (
    <div className='recommended'>
      <div className='recommended--title'>
        <h1>Default Playlists</h1>
      </div>
      {defaultPlaylists.map((track, index) => {
        return (
          <div className='recommended--block' key={index}>
            <a href={track.uri}>
              <div className='recommended--block__cover'>
                <img src={track.images[0].url} alt={track.name} />
              </div>
              <div className='recommended--block__title'>{track.name}</div>
            </a>
          </div>
        );
      })}
    </div>
  );
}
