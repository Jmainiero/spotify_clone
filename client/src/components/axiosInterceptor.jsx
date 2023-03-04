import { useDispatch, useSelector } from 'react-redux';

(function () {
     String token = store.getState().session.token;
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        axios.defaults.headers.common['Authorization'] = null;
        /*if setting null does not remove `Authorization` header then try     
          delete axios.defaults.headers.common['Authorization'];
        */
    }
})();