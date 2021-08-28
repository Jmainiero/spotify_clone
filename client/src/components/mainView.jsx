import GetRecommended from '../components/recommended';
import RecentlyPlayed from '../components/recentlyPlayed';
export default function mainView({recommended, recentlyPlayed}) {
    return (
        <div className="main-view">
            <RecentlyPlayed recentlyPlayed={recentlyPlayed} />
            <GetRecommended recommended={recommended}/>
        </div>
    )
}
