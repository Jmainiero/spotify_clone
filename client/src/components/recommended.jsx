export default function getRecommended({ recommended }) {
  return (
    <div className='recommended'>
      <div className='recommended--title'>
        <h1>Recommended Songs For You</h1>
        <h4>Get better recommendations the more you listen.</h4>
      </div>
      {recommended.map((track, index) => {
        return (
          <a href={track.href} key={index}>
            <div className='recommended--block'>
              <div className='recommended--block__cover'>
                <img
                  src={track.album.images[track.album.images.length - 2].url}
                  alt={track.name}
                />
              </div>
              <div className='recommended--block__title'>{track.name}</div>
              <div className='recommended--block__artist'>
                {track.artists[0].name}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
