import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import DropDownInput from '../Components/DropDownInputDriver';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registration.css';
import InputField from '../Components/InputField';
import SubmitButton from '../Components/SubmitButton';
import Footer from '../Components/Footer';
import Quote from '../Components/Quote';

const RegistrationPage = () => {
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUserTypeChange = (selectedOption) => {
    setUserType(selectedOption);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = {
      role: userType,
      username: username,
      password: password,
    };

    const token = localStorage.getItem('jwt');

    const response = await fetch('https://www.igorgawlowicz.pl/kegdelpol/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Dodanie tokena do nagłówka
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.status === 200) {
      console.log('Registration successful');
      console.log('Response:', data);
    } else {
      console.log('Registration failed');
      console.log('Response:', data);
    }
    console.log(userData);
  };

  return (
    <div className="registration-container">
      <Navbar />
      <div className="container">
        <Quote quoteText="Did you know that Budweiser is the world’s most famous beer?" />
        <div className="heading">
          <span>REGISTER</span> NEW ACCOUNT
        </div>
        <div className="registration-flexbox">
            <DropDownInput label="User Type" options={['Employee', 'Driver', 'Customer']} onChange={handleUserTypeChange} />
            <InputField label="Username" id="username" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
            <InputField label="Password" id="password" placeholder="Enter password" type="password" value={password} onChange={handlePasswordChange} />
        </div>
        
        <SubmitButton buttonText="Confirm" onClick={handleRegister} />
      </div>
      <Footer />
    </div>
  );
};

export default RegistrationPage;
