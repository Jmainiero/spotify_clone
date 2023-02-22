import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import axios from 'axios';
import './sass/_main.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { setAuthToken } from './redux/actions/authActions';
import Login from './components/login';
import Dashboard from './components/dashboard';
import UseAuth from './components/auth';

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessTK);
  const expiresIn = useSelector((state) => state.auth.expiration);



  useEffect(() => {
    if (!accessToken) {
      <Redirect to="/login" />
    }
  }, [], UseAuth())

  useEffect(()=>{
    console.log(axios.defaults.headers)
  })

  if (new URLSearchParams(window.location.search).get('code')) {
    dispatch(setAuthToken(new URLSearchParams(window.location.search).get('code')));
    // userAuth();
  }
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path="/home" query="code"><Redirect to="/" /></Route>
          <Route path="/login" exact component={Login} />
          {accessToken && Date.now() <= expiresIn ?
            <Route path="/" exact> <Dashboard /> </Route> : <Login />
          }
          <Route>404 Not found</Route>
        </Switch>
      </div >
    </Router>
  );
}

export default App;
