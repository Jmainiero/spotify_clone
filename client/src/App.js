import './css/app.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from './components/footer';
import Login from './components/login';
import Dashboard from './components/dashboard';

function App() {
  const code = new URLSearchParams(window.location.search).get('code');
  return (
    <div className='App'>
      {code ? <Dashboard code={code} /> : <Login />} <Footer />
    </div>
  );
}

export default App;
