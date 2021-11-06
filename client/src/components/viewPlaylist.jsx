import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectedPlaylist } from '../redux/actions/sidebarActions';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SongRow from './songRow';
const axios = require('axios');

export default function ViewPlaylist() {
  const { playlistId } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.authTK);
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const r = await axios.post('http://localhost:8888/fetchPlaylist', {
          access_token: accessToken,
          playlistId: playlistId,
        });
        console.log(r.data);
        dispatch(selectedPlaylist(r.data));
        setPlaylist(r.data);
      } catch (err) {
        console.log('Err: ', err);
      }
    };
    fetchPlaylist();
  }, playlistId);

  if (!playlist) return null;
  return (
    <div className='playlist-view'>
      <div className='body__info'>
        <img src={playlist.images[0].url} alt='header-img' />
        <div className='body__infoText'>
          <strong>{playlist.type.toUpperCase()}</strong>
          <h2>{playlist.name}</h2>
          <p>{playlist.description}</p>
        </div>
      </div>
      <div className='body__icons'>
        <PlayCircleFilledIcon className='playlist-view__play-icon' />
        <FavoriteIcon fontSize='large' />
        <MoreHorizIcon />
      </div>
      <div className='body__songs'>
        <SongRow />
      </div>
    </div>
  );
}
