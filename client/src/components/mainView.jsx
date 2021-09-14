import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import GetRecommended from '../components/recommended';
import RecentlyPlayed from '../components/recentlyPlayed';
import FeaturedPlaylists from '../components/featuredPlaylists';
import DefaultPlaylists from '../components/defaultPlaylists';
import NewReleases from '../components/newReleases';

export default function mainView({
  handleClick,
  recommended,
  recentlyPlayed,
  featuredPlaylists,
  defaultPlaylists,
  newReleases,
}) {
  return (
    <div className='main-view'>
      <GetRecommended recommended={recommended} handleClick={handleClick} />
      <FeaturedPlaylists
        featuredPlaylists={featuredPlaylists}
        handleClick={handleClick}
      />
      <NewReleases newReleases={newReleases} handleClick={handleClick} />
      <RecentlyPlayed
        recentlyPlayed={recentlyPlayed}
        handleClick={handleClick}
      />
      <DefaultPlaylists
        defaultPlaylists={defaultPlaylists}
        handleClick={handleClick}
      />
    </div>
  );
}
