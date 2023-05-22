import React from "react";
export const DropdownUser = ({ visibility = false }) => {
    function doLogout() {
        console.log('Do Logout')
        localStorage.removeItem('persist:root'); 
        window.location = '/'
    }

    if (visibility)
        return (
            <ul className="drop-down">
                <li className="drop-item">Account</li>
                <li className="drop-item">Profile</li>
                <li className="drop-item" onClick={doLogout}>Log out</li>
            </ul>
        );
    else return null;
};