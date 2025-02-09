import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import InputField from '../Components/InputField';
import DropDownInput from '../Components/DropDownInputDriver';
import ConfirmButton from '../Components/ConfirmButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddNewVehicle.css';
import Quote from '../Components/Quote';

const AddNewVehicle = () => {
  const [vehicleType, setVehicleType] = useState('');
  const [capacity, setCapacity] = useState('');
  const [registrationInfo, setRegistrationInfo] = useState('');

  const handleVehicleTypeChange = (value) => {
    setVehicleType(value);
  };

  const handleCapacityChange = (event) => {
    setCapacity(event.target.value);
  };

  const handleRegistrationInfoChange = (event) => {
    setRegistrationInfo(event.target.value);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem('jwt');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        type: vehicleType,
        capacity: capacity,
        registration_info: registrationInfo
      })
    };

    fetch('https://www.igorgawlowicz.pl/kegdelpol/employee/vehicles', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Response:', data);
        // Dodatkowa logika po udanym dodaniu pojazdu
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div className="add-new-vehicle-container">
      <Navbar />
      <div className="container">
        <Quote quoteText="Did you know that most successful beer brands offer Pilsner?" />
        <div className="heading"><span>ADD</span> NEW VEHICLE</div>
        <div className="vehicle-flex">
          <div className="vehicle-type">
            <DropDownInput label="Vehicle Type" options={['Car', 'Truck', 'Motorcycle']} onChange={handleVehicleTypeChange} />
          </div>
          <InputField label="Capacity" id="capacity" placeholder="Enter capacity" onChange={handleCapacityChange} />
          <InputField label="Registration Info" id="registrationInfo" placeholder="Enter registration info" onChange={handleRegistrationInfoChange} />
        </div>
        <ConfirmButton buttonText="CONFIRM" onClick={handleSubmit} />
      </div>
      <Footer />
    </div>
  );
};

export default AddNewVehicle;
