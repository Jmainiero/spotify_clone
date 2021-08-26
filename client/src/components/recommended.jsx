export default function getRecommended({ recommended }) {
  console.log(recommended);

  return (
    <div className='recommended'>
      <ul>
        {recommended.tracks.map((track, index) => {
          return (
            <li key={index}>
              <a href={track.href}>{track.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
