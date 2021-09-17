import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Master from './masterDisplay';

export default function mainView({ handleClick, master }) {
  return (
    <div className='main-view'>
      <Master data={master} handleClick={handleClick} />
    </div>
  );
}
