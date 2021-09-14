import Slider from 'react-slick';
const slideShowSettings = require('../slideShowSettings');
export default function newReleases({ newReleases, handleClick }) {
  return (
    <div className='recommended'>
      <div className='recommended--title'>
        <h1>New Releases</h1>
      </div>
      <div className='recommended--carousel'>
        <Slider {...slideShowSettings.settings}>
          {newReleases.map((track, index) => {
            return (
              <div className='recommended--block' key={index}>
                <a href={track.uri} onClick={handleClick}>
                  <div className='recommended--block__cover'>
                    <img src={track.images[0].url} alt={track.name} />
                  </div>
                  <div className='recommended--block__title'>{track.name}</div>
                  <div className='recommended--block__artist'>
                    {track.artists[0].name}
                  </div>
                  <div className='recommended--block__desc'>
                    {track.album_type.charAt(0).toUpperCase() +
                      track.album_type.substr(1)}
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
