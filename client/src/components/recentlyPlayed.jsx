import Slider from "react-slick";
export default function recentlyPlayed({ recentlyPlayed }) {
  var settings = {
    dots: false,
    variableWidth: true,
    variableHeight: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    rows: 1
  };
  return (
    <div className='recommended'>
      <div className='recommended--title'>
        <h1>Jump Back In</h1>
      </div>
      <div className='recommended--carousel'>
        <Slider {...settings}>
          {recentlyPlayed.map((track, index) => {
            return (
              <div className='recommended--block' key={index}>
                <a href={track.track.href} >
                  <div className='recommended--block__cover'>
                    <img
                      src={
                        track.track.album.images[
                          track.track.album.images.length - 2
                        ].url
                      }
                      alt={track.name}
                    />
                  </div>
                  <div className='recommended--block__title'>
                    {track.track.name}
                  </div>
                  <div className='recommended--block__artist'>
                    {track.track.artists[0].name}
                  </div>
                </a>

              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
