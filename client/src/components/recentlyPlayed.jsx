export default function recentlyPlayed({ recentlyPlayed }) {
    return (
        <div className='recommended'>
            <div className='recommended--title'>
                <h1>Recently Played</h1>
            </div>
            {recentlyPlayed.map((track, index) => {
                return (
                    <a href={track.track.href} key={index}>
                        <div className="recommended--block" >

                            <div className="recommended--block__cover">
                                <img src={track.track.album.images[track.track.album.images.length - 2].url} alt={track.name} />
                            </div>
                            <div className="recommended--block__title">
                                {track.track.name}
                            </div>
                        </div>
                    </a>
                );
            })}
        </div>
    );
}
