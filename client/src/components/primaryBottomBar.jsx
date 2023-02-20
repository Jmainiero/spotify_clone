import axios from 'axios'
import { setPlaying } from '../redux/actions/playerActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle, faPlay, faPause, faBackward, faForward, faRepeat } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useDispatch, useDisplay, useSelector } from 'react-redux'
import CostumRange from './CostumRange.js'

const secondsToTime = (ms) => {
  // console.log(ms/60000)
  const minutes = (ms / 60000).toString().split('.')[0]
  const seconds = ('0.' + (ms / 60000).toString().split('.')[1]) * 60 / 100
  // console.log(minutes, seconds)
  // console.log(parseFloat(parseInt(minutes)+seconds, 2).toFixed(2))
  return parseFloat(parseInt(minutes) + seconds, 2).toFixed(2)
}

const PrimaryBottomBar = () => {
  const dispatch = useDispatch()

  const currentSong = useSelector(state => state.player.currentSong)
  const accessToken = useSelector(state => state.auth.accessTK)
  const play = useSelector(state => state.player.playing)
  console.log(play)
  // const [play, setPlay] = useState(false);
  const [albumCover, setAlbumCover] = useState('')
  const [songTitle, setSongTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [songLength, setSongLength] = useState(0)
  const [currentDuration, setCurrentDuration] = useState(0)

  const skipToState = (state) =>{
    axios
      .post('/skipToState', {
        state: state
      }, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }
      )
      .then((res) => {
        dispatch(setPlaying(true))
      })
      .catch((e) => {
        console.error(e)
      });
  }

  useEffect(() => {
    if (!accessToken) return;
    axios
      .post('/changePlayerState', {
        state: (play === true ? 'play' : 'pause'),
        spotifyURI: currentSong
      }, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      }
      )
      .then((res) => {
        setAlbumCover(res.data.getPlayerDetails.song_cover)
        setSongTitle(res.data.getPlayerDetails.song_title)
        setSongLength(res.data.getPlayerDetails.song_length)
        setCurrentDuration(res.data.getPlayerDetails.current_duration)
        setArtist(res.data.getPlayerDetails.song_artist)
        console.table([play, albumCover, songTitle, currentDuration, songLength, artist])
      })
      .catch((e) => {
        console.error(e)
      });

  }, [play, currentSong])


  useEffect(() => {
    if (play === true) {
      const interval = setInterval(() => {
        setCurrentDuration(ms => currentDuration + 1000);
      }, 1050);
      return () => clearInterval(interval);
    }
  }, [currentDuration])

  return (
    <div className='bottom-bar'>
      <div className='player'>
        <div className="player_current">
          <div className='player_current_album'>
            <img src={albumCover} alt="album-cover"></img>
          </div>
          <div className="player_current_track">
            <h5>{songTitle}</h5>
            <h6>{artist}</h6>
          </div>
        </div>
        <div className="player_primary">
          <div className="player_primary__top">
            <button className="player_primayer__shuffle">
              <FontAwesomeIcon icon={faShuffle} size="1x" />
            </button>
            <button className="player_primayer__shuffle">
              <FontAwesomeIcon icon={faBackward} size="1x" onClick={() => skipToState('previous')} />
            </button>
            <button className="player_primayer__shuffle" onClick={() => dispatch(setPlaying(!play))}>
              {play ? <FontAwesomeIcon icon={faPause} size="1x" /> : <FontAwesomeIcon icon={faPlay} size="1x" />}
            </button>
            <button className="player_primayer__shuffle">
              <FontAwesomeIcon icon={faForward} size="1x" onClick={() => skipToState('next')} />
            </button>
            <button className="player_primayer__shuffle">
              <FontAwesomeIcon icon={faRepeat} size="1x" />
            </button>
          </div>
          <div className='player_primary__bottom'>
            <div className='player_primary__bottom__bar__text'>
              {secondsToTime(currentDuration).toString().replace('.', ':')}
            </div>

            <CostumRange
              step={0.1}
              min={0}
              max={songLength || 1}
              value={currentDuration}
            // onChange={value => value}

            />
            <div className='player_primary__bottom__bar__text'>
              {secondsToTime(songLength).toString().replace('.', ':')}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryBottomBar;
