import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRefreshToken, setExpiration, setAccessToken } from '../redux/actions/authActions';
import axios from 'axios';

const UseAuth = () => {
  const dispatch = useDispatch();
  const code = useSelector((state) => state.auth.authTK);
  const refreshToken = useSelector((state) => state.auth.refreshTK);
  const accessToken = useSelector((state) => state.auth.accessTK);
  const expiresIn = useSelector((state) => state.auth.expiration);
  
  useEffect(() => {
    console.table([code, refreshToken, accessToken, expiresIn])
    if ((!refreshToken && !expiresIn && !accessToken) && !!code) {
      console.log('Running Token')
      axios
        .post('/token', {
          code: code,
        })
        .then((res) => {
          dispatch(setRefreshToken(res.data.refresh_token))
          dispatch(setAccessToken(res.data.access_token))
          dispatch(setExpiration(res.data.expires_in))
          console.log(res.data)
        })
        .catch((e) => {
          console.error(e)
        });
    } else  {
      // axios
      //   .post('http://localhost:8888/refresh', {
      //     refreshToken: refreshToken,
      //   })
      //   .then((res) => {
      //     setAccessToken(res.data.accessToken);
      //     setExpiresIn(res.data.expiresIn);
      //   })
      //   .catch((e) => {
      //     console.error(e)
      //   });
    }
  }, [refreshToken, expiresIn, code]);
  return accessToken
}

export default UseAuth