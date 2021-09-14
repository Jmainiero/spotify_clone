import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import GetRecommended from './recommended';
import RecentlyPlayed from './recentlyPlayed';
import FeaturedPlaylists from './featuredPlaylists';
import DefaultPlaylists from './defaultPlaylists';
import NewReleases from './newReleases';

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
