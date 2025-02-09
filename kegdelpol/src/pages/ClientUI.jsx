import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import MoveTo from '../Components/MoveTo';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ClientUI.css';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../Components/LogoutButton';

const ClientUI = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("auth_id");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <div className="client-ui">
      <Navbar />
      <div className="client-grid-elements">
      
      <div className="item-1">Choose your action</div>
      <div className="item-2"><LogoutButton className="logout-button" onLogout={handleLogout}/></div>
      <div className="item-3"><MoveTo imageSrc="/shoppingcart.svg" title="Create orders" to="/CreateOrder" /></div>
      <div className="item-4"><MoveTo imageSrc="/order.svg" title="Orders" to="/ReadOrders" /></div>
      <div className="item-5"><MoveTo imageSrc="/box-item.svg" title="Add New Item" to ="/AddNewItem"/></div>
        
      </div>
      <Footer />
    </div>
  );
};

export default ClientUI;
