import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylists } from '../../redux/actions/sidebarActions';
import { setTracks } from '../../redux/actions/trackActions';
import { setUser } from '../../redux/actions/userActions';

const axios = require('axios');

export const useAPIHandler = () => {
    const dispatch = useDispatch();
    const master = useSelector((state) => state.tracks.tracks);
    const userDetails = useSelector((state) => state.user.user);
    const queryAPI = (async () => {
        try {
            const user = await axios.post('/fetchUser');
            dispatch(setUser((user.data)));

            const playlist = await axios.post('/playlists');
            dispatch(setPlaylists(playlist.data));

            const master = await axios.post('/master');
            dispatch(setTracks((master.data)));
        } catch (e) {
            console.error(e)
        }
    })

    useEffect(() => {
        if (!master.length > 0 && !Object.keys(userDetails).length > 0) queryAPI()
    },[])

    return { master: master, userDetails: userDetails }
}