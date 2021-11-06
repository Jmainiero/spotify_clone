import React from 'react';
import { useSelector } from 'react-redux';

function SongRow() {
  const playlist = useSelector((state) => state.sidebar.selectedPlaylist);
  console.log(`playlist`, playlist);
  return (
    <div>
      {playlist.tracks.items.map((item, index) => {
        return (
          <div className='songRow'>
            <img
              className='songRow__album'
              src={item.track.album.images[0].url}
              alt=''
            />
            <div className='songRow__info'>
              {console.log(item.track.name)}
              <h1>{item.track.name}</h1>
              <p>
                {item.track.artists.map((artist) => artist.name).join(', ')} -{' '}
                {item.track.album.name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SongRow;
