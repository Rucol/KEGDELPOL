import React from 'react';
import './SubmitButton.css';

const SubmitButton = ({ buttonText, onClick }) => {
  return (
    <button className="btn submit-button" onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default SubmitButton;
