import { useSelector } from 'react-redux';
import React, { useState } from "react";

import { DropdownUser } from './DropdownUser';

export const Userbar = ()  =>{
  const userDetails = useSelector((state) => state.user.user) || [];
  const [dropVisibility, setDropVisibility] = useState(false);

  function toggleDropdown(e) {
    e.stopPropagation();

    setDropVisibility(!dropVisibility);
    if (!dropVisibility) document.addEventListener("click", closeDropdown);
  }

  function closeDropdown(e) {
    e.stopPropagation();

    setDropVisibility(false);
    document.removeEventListener("click", closeDropdown);
  }

  return (
    <div className='user-bar'>
      <div className={`user-bar--container ${dropVisibility ? "drop-is-open" : ""}`} onClick={toggleDropdown}>
        <div>
          <div className='user-bar__img'>
            <img src={userDetails.images[0].url} alt={userDetails.display_name} />
          </div>
          {userDetails.display_name}
        </div>
      </div>
      <DropdownUser visibility={dropVisibility} />
    </div>
  );
}
