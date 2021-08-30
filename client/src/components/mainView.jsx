import GetRecommended from '../components/recommended';
import RecentlyPlayed from '../components/recentlyPlayed';
import FeaturedPlaylists from '../components/featuredPlaylists';
export default function mainView({
  recommended,
  recentlyPlayed,
  featuredPlaylists,
}) {
  return (
    <div className='main-view'>
      <RecentlyPlayed recentlyPlayed={recentlyPlayed} />
      <FeaturedPlaylists featuredPlaylists={featuredPlaylists} />
      <GetRecommended recommended={recommended} />
    </div>
  );
}
