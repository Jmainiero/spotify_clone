import React from 'react';

export default function login() {
  const AUTH_URL =
    'https://accounts.spotify.com/authorize?client_id=8cc20e23735342cea66a5ae448fa4813&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-private%20user-read-email%20user-library-modify%20user-library-read%20user-read-playback-state%20user-modify-playback-state%20streaming%20playlist-read-private%20playlist-read-collaborative';

  return (
    <div className='login'>
      <h1>To Begin, Click To Authorize</h1>
      <div className='login-button'>
        <a href={AUTH_URL}>Login with Spotify</a>
      </div>
    </div>
  );
}
