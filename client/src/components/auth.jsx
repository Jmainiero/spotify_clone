import { useEffect } from 'react';
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
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    console.log(axios.defaults.headers)
    console.table([code, refreshToken, accessToken, expiresIn, axios.defaults.headers.Authorization])
    if ((!refreshToken && !expiresIn && !accessToken) && !!code) {
      console.log('/token')
      axios
        .post('/token', {
          code: code,
        })
        .then((res) => {
          dispatch(setRefreshToken(res.data.refresh_token))
          dispatch(setAccessToken(res.data.access_token))
          dispatch(setExpiration(Date.now() + 3000000)) //For testing, set it to minus to subtract an hour.
        })
        .catch((e) => {
          console.error(e)
        });
    } else if ((refreshToken && expiresIn && accessToken && code) && Date.now() >= expiresIn) {
      console.log('/token')
      axios
        .post('/refresh', {
          refreshToken: refreshToken,
        })
        .then((res) => {
          console.log(res)
          if (res.data.accessToken) {
            console.log('Setting new token')
            dispatch(setAccessToken(res.data.accessToken))
            dispatch(setExpiration(Date.now() + 3000000))
          }
        })
        .catch((e) => {
          console.error(e)
        });
    }
  }, [refreshToken, expiresIn, code]);
  return accessToken
}

export default UseAuth