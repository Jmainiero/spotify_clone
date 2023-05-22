import axios from 'axios'
import { setPlaying, setDevice } from '../../redux/actions/playerActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShuffle, faPlay, faPause, faBackward, faForward, faRepeat } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDidMount } from '../useDidMount';
import Devices from './Devices'
import CostumRange from '../util/playerRender.js'

const secondsToTime = (ms) => {
  const minutes = (ms / 60000).toString().split('.')[0]
  const seconds = ('0.' + (ms / 60000).toString().split('.')[1]) * 60 / 100
  return !isNaN(parseFloat(parseInt(minutes) + seconds, 2).toFixed(2)) ? parseFloat(parseInt(minutes) + seconds, 2).toFixed(2) : '00:00'
}

export const Bottombar = () => {
  const dispatch = useDispatch()

  //Can be set anywhere in application
  const requestedSong = useSelector(state => state.player.currentSong)
  const play = useSelector(state => state.player.playing)
  const currentDevice = useSelector(state => state.player.device.id)
  const isMount = useDidMount() //Used to determine if initial state load, used to keep functions from involking on pageload

  //Set locally here for display purposes.
  const [albumCover, setAlbumCover] = useState('')
  const [songTitle, setSongTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [songLength, setSongLength] = useState(0.001)
  const [currentDuration, setCurrentDuration] = useState(0.001)
  const [currentSong, setCurrentSong] = useState(requestedSong) //Default value to what's stored in state

  const skipToState = (state) => {
    axios
      .post('/skipToState', {
        state: state
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setPlaying(true))
          setAlbumCover(res.data.getPlayerDetails.song_cover)
          setSongTitle(res.data.getPlayerDetails.song_title)
          setSongLength(res.data.getPlayerDetails.song_length)
          setCurrentDuration(res.data.getPlayerDetails.current_duration)
          setArtist(res.data.getPlayerDetails.song_artist)
          dispatch(setDevice({ device: res.data.getPlayerDetails.device.device, id: res.data.getPlayerDetails.device.id }))
        }
      })
      .catch((e) => {
        console.error(e)
      });
  }

  useEffect(() => {
    (async () => {
      // console.log(requestedSong, currentSong, requestedSong !== currentSong)
      if (isMount) {
        await axios
          .post('/getPlayerState', {}
          )
          .then((res) => {
            if (res.status === 200) {
              setAlbumCover(res.data.song_cover)
              setSongTitle(res.data.song_title)
              setSongLength(res.data.song_length)
              setCurrentDuration(res.data.current_duration)
              setArtist(res.data.song_artist)
              setCurrentSong(requestedSong)
              dispatch(setDevice({ device: res.data.device.device, id: res.data.device.id }))
            }
          })
          .catch((e) => {
            console.error(e)
          });
        return
      } else {
        console.log(`Play Status: ${play}`)
        await axios
          .post('/changePlayerState', {
            state: (play === true ? 'play' : 'pause'),
            spotifyURI: (requestedSong !== currentSong ? requestedSong : ''),
            device: currentDevice
          }
          )
          .then((res) => {
            if (res.status === 200) {
              setAlbumCover(res.data.getPlayerDetails.song_cover)
              setSongTitle(res.data.getPlayerDetails.song_title)
              setSongLength(res.data.getPlayerDetails.song_length)
              setCurrentDuration(res.data.getPlayerDetails.current_duration)
              setArtist(res.data.getPlayerDetails.song_artist)
              setCurrentSong(requestedSong)
            }
          })
          .catch((e) => {
            console.error(e)
          });
      }
    })()
  }, [play, requestedSong])

  useEffect(() => {
    if (play === true) {
      const interval = setInterval(() => {
        if (currentDuration >= songLength) return () => clearInterval(interval);
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
            {albumCover ? <img src={albumCover} alt="album-cover"></img> : false}
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
            />

            <div className='player_primary__bottom__bar__text'>
              {secondsToTime(songLength).toString().replace('.', ':')}
            </div>
          </div>
        </div>
        {/* <Devices /> */}
      </div>
    </div>
  );
};
