import { useState, useEffect } from 'react';

import SpotifyPlayer from 'react-spotify-web-playback';

const PrimaryBottomBar = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false);
  const [selectedSong, setSelectedSong] = useState(
    'spotify:playlist:37i9dQZF1DX1KHLbhJkg7B'
  );

  useEffect(() => {
    setSelectedSong(trackUri);
    setPlay(!play);
  }, [trackUri]);
  if (!accessToken) return;
  return (
    <div className='bottom-bar'>
      <div className='bottom-bar__player'>
        <SpotifyPlayer
          token={accessToken}
          showSaveIcon
          callback={(state) => {
            if (!state.isPlaying) setPlay(false);
          }}
          play={play}
          uris={selectedSong}
          token={accessToken}
          styles={{
            activeColor: '#fff',
            bgColor: '#181818',
            color: '#fff',
            loaderColor: '#fff',
            sliderColor: '#1cb954',
            sliderHandle: '#161212',
            trackArtistColor: '#ccc',
            trackNameColor: '#fff',
          }}
        />
      </div>
    </div>
  );
};

export default PrimaryBottomBar;
