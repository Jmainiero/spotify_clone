import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
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
  const authTK = useSelector((state) => state.auth.accessTK);
  useEffect(() => {
    
    if (!authTK) {
      <Redirect to="/login" />
    }
  }, [], UseAuth())

  if (new URLSearchParams(window.location.search).get('code')) {
    console.log('Hitting 24')
    dispatch(setAuthToken(new URLSearchParams(window.location.search).get('code')));
    console.log('25')
    // userAuth();
  }
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route path="/home" query="code"><Redirect to="/"/></Route>
          <Route path="/login" exact component={Login} />
          {accessToken ?
            <Route path="/" > <Dashboard /> </Route> : <Login />
          }
          <Route>404 Not found</Route>
        </Switch>
      </div >
    </Router>
  );
}

export default App;
