import Slider from 'react-slick';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { AssignmentTurnedInOutlined } from '@material-ui/icons';

const slideShowSettings = require('../slideShowSettings');
export default function getRecommended({ recommended, handleClick }) {
  return (
    <div className='recommended'>
      <div className='recommended--title'>
        <h1>Recommended Songs For You</h1>
        <h4>Get better recommendations the more you listen.</h4>
      </div>
      <div className='recommended--carousel'>
        <Slider {...slideShowSettings.settings}>
          {recommended.map((track, index) => {
            return (
              <div className='recommended--block' key={index}>
                <a href={track.uri} onClick={handleClick}>
                  <div className='recommended--block__cover'>
                    <img
                      src={
                        track.album.images[track.album.images.length - 2].url
                      }
                      alt={track.name}
                    />
                  </div>
                  <div className='recommended--block__title'>{track.name}</div>
                  <div className='recommended--block__artist'>
                    {track.artists[0].name}
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
}
