import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function ViewPlaylist() {
  const { playlistId } = useParams();
  console.log(playlistId);
  console.log('Loaded');
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
