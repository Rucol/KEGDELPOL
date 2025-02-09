import React, { useState, useEffect, useRef } from 'react';
import { Button, Dropdown } from 'react-bootstrap';

const statusOptions = ['Pending', 'Delivered', 'Cancelled'];

const StatusButton = ({ currentStatus, onStatusChange }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleStatusSelect = (status) => {
    onStatusChange(status);
    setIsDropdownVisible(false);
  };

  return (
    <div className="status-button-container" ref={dropdownRef}>
      <Button variant="primary" onClick={handleButtonClick}>
        Change Status
      </Button>
      {isDropdownVisible && (
        <Dropdown.Menu show className="status-dropdown-menu">
          {statusOptions.map((status, index) => (
            <Dropdown.Item key={index} onClick={() => handleStatusSelect(status)}>
              {status}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      )}
    </div>
  );
};

export default StatusButton;
