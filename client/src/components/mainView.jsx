import GetRecommended from '../components/recommended';
import RecentlyPlayed from '../components/recentlyPlayed';
import FeaturedPlaylists from '../components/featuredPlaylists';
import DefaultPlaylists from '../components/defaultPlaylists';
import NewReleases from '../components/newReleases';
export default function mainView({
  recommended,
  recentlyPlayed,
  featuredPlaylists,
  defaultPlaylists,
  newReleases,
}) {
  return (
    <div className='main-view'>
      <NewReleases newReleases={newReleases} />
      <DefaultPlaylists defaultPlaylists={defaultPlaylists} />
      <RecentlyPlayed recentlyPlayed={recentlyPlayed} />
      <FeaturedPlaylists featuredPlaylists={featuredPlaylists} />
      <GetRecommended recommended={recommended} />
    </div>
  );
}
