import SpotifyPlayer from 'react-spotify-web-playback';
const primaryBottomBar = () => {
  return (
    <SpotifyPlayer
      // token={accessToken}
      showSaveIcon
      callback={(state) => {
        // if (!state.isPlaying) setPlay(false);
      }}
      // play={play}
      // uris={trackUri ? [trackUri] : []}
    />
  );
};

export default primaryBottomBar;
