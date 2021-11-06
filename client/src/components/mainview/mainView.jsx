import { withRouter } from 'react-router';
import { BrowserRouter as Route, Switch } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Master from './masterDisplay';
import ViewPlaylist from '../viewPlaylist';

export default withRouter(function mainView({ handleClick, master }) {
  return (
    <div className='main-view'>
      {window.location.href.indexOf('playlist') > -1 ? (
        <ViewPlaylist />
      ) : (
        <Master data={master} handleClick={handleClick} />
      )}
    </div>
  );
});
