export default function topCategories({ topCategories }) {
  return (
    <div className='recommended'>
      <div className='recommended--title'>
        <h1>Browse Categories</h1>
      </div>
      {topCategories.map((track, index) => {
        return (
          <a href={track.href} key={index}>
            <div className='recommended--block'>
              <div className='recommended--block__cover'>
                <img src={track.icons[0].url} alt={track.id} />
              </div>
              <div className='recommended--block__title'>{track.name}</div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
