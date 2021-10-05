import Slider from 'react-slick';
const slideShowSettings = require('../slideShowSettings');
export default function featuredPlaylists({ featuredPlaylists, handleClick }) {
  return (
    <div className='recommended'>
      <div className='recommended--title'>
        <h1>Featured Playlists</h1>
      </div>
      <div className='recommended--carousel'>
        <Slider {...slideShowSettings.settings}>
          {featuredPlaylists.map((track, index) => {
            return (
              <div className='recommended--block' key={index}>
                <a href={track.uri} onClick={handleClick}>
                  <div className='recommended--block__cover'>
                    <img src={track.images[0].url} alt={track.name} />
                  </div>
                  <div className='recommended--block__title'>{track.name}</div>
                  <div className='recommended--block__desc'>
                    {track.description}
                  </div>
                </a>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
