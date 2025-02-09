import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ButtonSelect = ({ onSelect }) => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (status) => {
    const newActive = activeButton === status ? null : status;
    setActiveButton(newActive);
    onSelect(newActive);
  };

  return (
    <div className="button-select my-3">
      <button
        className={`btn ${activeButton === 'Processing' ? 'btn-primary' : 'btn-secondary'} mx-1`}
        onClick={() => handleButtonClick('Processing')}
      >
        Processing
      </button>
      <button
        className={`btn ${activeButton === 'Shipped' ? 'btn-primary' : 'btn-secondary'} mx-1`}
        onClick={() => handleButtonClick('Shipped')}
      >
        Shipped
      </button>
    </div>
  );
};

export default ButtonSelect;
