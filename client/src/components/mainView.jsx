import GetRecommended from '../components/recommended';
import RecentlyPlayed from '../components/recentlyPlayed';
import FeaturedPlaylists from '../components/featuredPlaylists';
import TopArtists from '../components/topArtists';
export default function mainView({
  recommended,
  recentlyPlayed,
  featuredPlaylists,
  topArtists,
}) {
  return (
    <div className='main-view'>
      <RecentlyPlayed recentlyPlayed={recentlyPlayed} />
      <TopArtists topArtists={topArtists} />
      <FeaturedPlaylists featuredPlaylists={featuredPlaylists} />
      <GetRecommended recommended={recommended} />
    </div>
  );
}
