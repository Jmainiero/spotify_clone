export default function userBar({ userDetails }) {
  return (
    <div className='user-bar'>
      <p>{userDetails.display_name}</p>
      <div className='user-bar__img'>
        <img src={userDetails.images[0].url} alt={userDetails.display_name} />
      </div>
    </div>
  );
}
