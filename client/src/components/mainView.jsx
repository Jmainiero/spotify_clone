import GetRecommended from '../components/recommended';
import RecentlyPlayed from '../components/recentlyPlayed';
import FeaturedPlaylists from '../components/featuredPlaylists';
import DefaultPlaylists from '../components/defaultPlaylists';
import NewReleases from '../components/newReleases';
import TopCategories from '../components/topCategories';
export default function mainView({
  recommended,
  recentlyPlayed,
  featuredPlaylists,
  defaultPlaylists,
  newReleases,
  topCategories,
}) {
  return (
    <div className='main-view'>
      <RecentlyPlayed recentlyPlayed={recentlyPlayed} />
      <GetRecommended recommended={recommended} />
      <NewReleases newReleases={newReleases} />
      <DefaultPlaylists defaultPlaylists={defaultPlaylists} />
      <FeaturedPlaylists featuredPlaylists={featuredPlaylists} />
      <TopCategories topCategories={topCategories} />
    </div>
  );
}
