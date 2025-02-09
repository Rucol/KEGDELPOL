import React, { useState } from 'react';
import './ButtonSelect.css'; // Importuj plik stylów CSS

const ButtonSelect = ({ onSelect }) => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (type) => {
    const newActive = activeButton === type ? null : type;
    setActiveButton(newActive);
    onSelect(newActive);
  };

  return (
    <div className="button-select">
      <button
        className={`btn ${activeButton === 'orders' ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => handleButtonClick('orders')}
      >
        Orders
      </button>
      <button
        className={`btn ${activeButton === 'users' ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => handleButtonClick('users')}
      >
        Users
      </button>
      <button
        className={`btn ${activeButton === 'vehicle' ? 'btn-primary' : 'btn-secondary'}`}
        onClick={() => handleButtonClick('vehicle')}
      >
        Vehicle
      </button>
    </div>
  );
};

export default ButtonSelect;
