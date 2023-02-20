import { useAudio } from 'react-use';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle, faPlay, faPause, faBackward, faForward, faRepeat } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useDispatch, useDisplay, useSelector } from 'react-redux'
import CostumRange from './CostumRange.js';

const secondsToTime = (seconds) => {
  return new Date(1000 * seconds).toISOString().substring(14, 19);
}

const PrimaryBottomBar = ({ accessToken, trackUri }) => {
  const dispatch = useDispatch()
  
  const currentSong = useSelector(state => state.player.currentSong)
  console.log(`Current Song is: ${currentSong}`)
  const [play, setPlay] = useState(false);
  const [selectedSong, setSelectedSong] = useState(
    'https://api.spotify.com/v1/playlists/37i9dQZF1E8UBfZ8oCXQ9I'
  );
  
  const [audio, state, controls, ref] = useAudio({
    src: currentSong,
    autoPlay: true
  });
  console.log([audio, state, controls, ref])
  
  useEffect(() => {
    setSelectedSong(trackUri);
    setPlay(!play);
  }, [trackUri]);
  if (!accessToken) return;

  return (
    <div className='bottom-bar'>
      <div className='player'>
        <div className="player_current">
          <div className='player_current_album'>
            <img src="https://i.scdn.co/image/ab67616d0000b273dab325d38db91d858446d4b4" alt="album-cover"></img>
          </div>
          <div className="player_current_track">
            <h5>Kiss Tomorrow Goodbye</h5>
            <h6>Luke Bryan</h6>
          </div>
        </div>
        <div className="player_primary">
          <div className="player_primary__top">
            <button className="player_primayer__shuffle">
              <FontAwesomeIcon icon={faShuffle} size="1x" />
            </button>
            <button className="player_primayer__shuffle">
              <FontAwesomeIcon icon={faBackward} size="1x" />
            </button>
            <button className="player_primayer__shuffle" onClick={() => setPlay(!play)}>
              {play ? <FontAwesomeIcon icon={faPlay} size="1x" /> : <FontAwesomeIcon icon={faPause} size="1x" />}
            </button>
            <button className="player_primayer__shuffle">
              <FontAwesomeIcon icon={faForward} size="1x" />
            </button>
            <button className="player_primayer__shuffle">
              <FontAwesomeIcon icon={faRepeat} size="1x" />
            </button>
          </div>
          <div className='player_primary__bottom'>
            {audio}
            <div className='player_primary__bottom__bar__text'>
              {secondsToTime(0)}
            </div>

            <CostumRange
              step={0.1}
              min={0}
              max={state?.duration || 1}
              value={state?.time}
            // onChange={value => value}

            />
            <div className='player_primary__bottom__bar__text'>
              {secondsToTime(state?.time)}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryBottomBar;
