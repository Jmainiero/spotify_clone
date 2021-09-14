import Slider from 'react-slick';
const slideShowSettings = require('./slideShowSettings');
export default function recentlyPlayed({ recentlyPlayed, handleClick }) {
  return (
    <div className='recommended'>
      <div className='recommended--title'>
        <h1>Jump Back In</h1>
      </div>
      <div className='recommended--carousel'>
        <Slider {...slideShowSettings.settings}>
          {recentlyPlayed.map((track, index) => {
            return (
              <div className='recommended--block' key={index}>
                <a href={track.track.uri} onClick={handleClick}>
                  <div className='recommended--block__cover'>
                    <img
                      src={
                        track.track.album.images[
                          track.track.album.images.length - 2
                        ].url
                      }
                      alt={track.name}
                    />
                  </div>
                  <div className='recommended--block__title'>
                    {track.track.name}
                  </div>
                  <div className='recommended--block__artist'>
                    {track.track.artists[0].name}
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
