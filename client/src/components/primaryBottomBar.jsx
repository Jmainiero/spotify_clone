import { useState, useEffect } from 'react';

import SpotifyPlayer from 'react-spotify-web-playback';

const PrimaryBottomBar = (accessToken) => {
  const [play, setPlay] = useState(false);
  if (!accessToken.accessToken) return;
  return (
    <div className='bottom-bar'>
      <div className='bottom-bar__player'>
        <SpotifyPlayer
          token={accessToken}
          showSaveIcon
          callback={(state) => {
            if (!state.isPlaying) setPlay(false);
          }}
          play={false}
          uris={['spotify:playlist:37i9dQZF1DX1KHLbhJkg7B']}
          token={accessToken.accessToken}
          styles={{
            activeColor: '#fff',
            bgColor: '#161212',
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
