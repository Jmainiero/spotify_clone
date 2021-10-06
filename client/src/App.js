import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './css/app.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { setRefresh } from './redux/actions/authActions';
import Footer from './components/footer';
import Login from './components/login';
import Dashboard from './components/dashboard';
import ViewPlaylist from './components/viewPlaylist';
import userAuth from './components/auth';

function App() {
  const dispatch = useDispatch();
  if (new URLSearchParams(window.location.search).get('code')) {
    userAuth();
    dispatch(setRefresh(new URLSearchParams(window.location.search).get('code')));
  }
  const refreshToken = useSelector((state) => state.auth.refreshTK);
  const accessToken = useSelector((state) => state.auth.accessToken);
  return (
    <Router>
      <div className='App'>
        <Switch>
          {new URLSearchParams(window.location.search).get('code') ?
            <Route search='?code'> <Dashboard /> </Route> : console.log('Defaulting')
          }
          <Route path="/playlist" component={ViewPlaylist} /> :
          <Route path='/home'> <Dashboard /> </Route>
          <Route path="/" exact component={Login} />
          <Route>404 Not found</Route>
        </Switch>
        <Footer />
      </div >
    </Router>
  );
}

export default App;
