export default function getRecommended({ recommended }) {
  console.log(recommended);
  return (
    <div className='recommended'>
      <div className='recommended--title'>
        <h1>Recommended For You</h1>
      </div>
      {recommended.tracks.map((track, index) => {
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
