import React from 'react';
import './UserSearchInput.css';

const UserSearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="user-search-input-container">
      <div className="user-search-input">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-control"
        />
      </div>
    </div>
  );
};

export default UserSearchInput;
