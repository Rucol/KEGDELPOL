import React from 'react';
import './InputField.css';

const InputQuantity = ({ label, id, value, onChange }) => {
  const handleInputChange = (event) => {
    // Pobieramy wprowadzoną wartość
    let newValue = parseInt(event.target.value);

    // Sprawdzamy, czy wprowadzona wartość jest większa lub równa 1
    if (newValue < 1) {
      newValue = 1; // Jeśli jest mniejsza niż 1, ustawiamy na 1
    }

    // Wywołujemy funkcję przekazaną przez props onChange z nową wartością
    onChange(newValue);
  };

  return (
    <div className="input-container">
      <label htmlFor={id} className="form-label">{label}</label>
      <input
        type="number"
        id={id}
        value={value}
        onChange={handleInputChange}
        min="1" // Ustawiamy minimalną wartość na 1
        className="form-control input-field"
      />
    </div>
  );
};

export default InputQuantity;
