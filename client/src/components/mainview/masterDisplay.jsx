import Slider from 'react-slick';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
const slideShowSettings = require('../slideShowSettings');

export default function masterMainView({ data, handleClick }) {
  const r = data.map((list) => {
    return (
      <div className='recommended'>
        <div className='recommended--title'>
          <h1>{list.name}</h1>
          {list.description ? (
            <h4>Get better recommendations the more you listen.</h4>
          ) : null}
        </div>
        <div className='recommended--carousel'>
          <Slider {...slideShowSettings.settings}>
            {list.data.map((track, index) => {
              return (
                <div className='recommended--block' key={index}>
                  <a href={track.uri} onClick={handleClick}>
                    <div className='recommended--block__cover'>
                      {track.images ? (
                        <img src={track.images[0].url} alt={track.name} />
                      ) : (
                        <img src={track.album.images[0].url} alt={track.name} />
                      )}
                    </div>
                    <div className='recommended--block__title'>
                      {track.name}
                    </div>
                    {
                      <div className='recommended--block__artist'>
                        {track.artists ? track.artists[0].name : null}
                      </div>
                    }
                    <div className='recommended--block__desc'>
                      {track.album
                        ? track.album.album_type.charAt(0).toUpperCase() +
                          track.album.album_type.substr(1)
                        : track.description &&
                          track.description.indexOf('href') < 0
                        ? track.description
                        : null}
                    </div>
                  </a>
                  <div className='recommended--block__overlay'>
                    <IconButton
                      aria-label={track.uri}
                      href={track.uri}
                      onClick={handleClick}
                      disableRipple={true}
                      className='recommended--block__overlay__IconButton'
                    >
                      <PlayCircleFilledIcon link={track.uri} />
                    </IconButton>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    );
  });
  return r;
}
