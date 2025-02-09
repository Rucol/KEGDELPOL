import React from 'react';
import './LogoutButton.css';
import logoutIcon from './out.png';

const LogoutButton = ({ onLogout }) => {
  return (
    <button className="logout-button" onClick={onLogout}>
      Sign out
      <img src={logoutIcon} alt="Logout Icon" className="logout-icon" />
    </button>
  );
};

export default LogoutButton;