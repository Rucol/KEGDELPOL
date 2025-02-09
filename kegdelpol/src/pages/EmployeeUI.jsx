import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import MoveTo from '../Components/MoveTo';
import LogoutButton from '../Components/LogoutButton';
import './EmployeeUI.css';
import { useNavigate } from "react-router-dom";


const EmployeeUI = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("auth_id");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <div className="employee-ui">
      <Navbar />
            
            <div className="grid-elements">
              <div className="item-1">Choose your action</div>
              <div className="item-2"><LogoutButton className="logout-button" onLogout={handleLogout}/></div>
              <div className="item-3"><MoveTo imageSrc="/DriverLicense.svg" title="Assign The Driver" to="/AssignTheDriverUI" /></div>
              <div className="item-4"><MoveTo imageSrc="/AddUser.svg" title="Create New Account" to="/Registration" /></div>
              <div className="item-5"><MoveTo imageSrc="/Database.svg" title="Database" to="/ReadDbTable" /></div>
              <div className="item-6"><MoveTo imageSrc="/DeliveryBox.svg" title="Approve Order" to="/ChangeOrderStatus" /></div>
              <div className="item-7"><MoveTo imageSrc="/UpdateUser.svg" title="Update The User" to="/UpdateUser" /></div>
              <div className="item-8"><MoveTo imageSrc="/Truck.svg" title="Add Vehicle" to="/AddNewVehicle" />  </div>
              
              
            </div>
          
      <Footer />
      </div>
  );
};

export default EmployeeUI;
