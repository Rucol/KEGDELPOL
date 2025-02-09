import React from 'react';
import './ConfirmButton.css';

const ConfirmButton = ({ buttonText, onClick }) => {
  return (
    <button type="submit" className="submit-button" onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default ConfirmButton;
