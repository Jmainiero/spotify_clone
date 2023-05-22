import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useEffect } from 'react';

//Styling
import './sass/_main.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//Active components
import { setAuthToken } from './redux/actions/authActions';
import ProtectedRoute from './components/auth/protectedRoute'
import { Login } from './components/login/Login';
import { Dashboard } from './components/dashboard/Dashboard';
import UseAuth from './components/auth/auth';

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessTK);

  if (accessToken && axios.defaults.headers.common['Authorization'] !== `Bearer ${accessToken}`) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    <Redirect to="/login" />
  }
  useEffect(() => {
  }, [], UseAuth())

  if (new URLSearchParams(window.location.search).get('code')) {
    dispatch(setAuthToken(new URLSearchParams(window.location.search).get('code')));
  }

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route index component={!accessToken ? Login : ProtectedRoute({ accessToken: accessToken, children: Dashboard })} />
          <Route>404 Not found</Route>
        </Switch>
      </div >
    </Router>
  );
}

export default App;
