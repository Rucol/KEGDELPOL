import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import DropDownInput from '../Components/DropDownInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AssignTheDriverUI.css';
import ConfirmButton from '../Components/ConfirmButton';
import Quote from '../Components/Quote';

const AssignTheDriverUI = () => {
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedOrder, setSelectedOrder] = useState('');
  const [ordersData, setOrdersData] = useState([]);
  const [driversData, setDriversData] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchDrivers();
  }, []);

  const fetchOrders = () => {
    const token = localStorage.getItem('jwt'); // Pobranie tokena JWT z localStorage
    fetch("https://www.igorgawlowicz.pl/kegdelpol/order/orders", {
      headers: {
        'Authorization': `Bearer ${token}` // Dodanie tokena do nagłówka
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Orders:", data);
        // Assuming data is an array of orders
        const formattedOrders = data.map((order) => ({
          label: `Order ${order.order_id}`,
          value: order.order_id,
        }));
        setOrdersData(formattedOrders);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const fetchDrivers = () => {
    const token = localStorage.getItem('jwt'); // Pobranie tokena JWT z localStorage
    fetch("https://www.igorgawlowicz.pl/kegdelpol/driver/get_all_drivers", {
      headers: {
        'Authorization': `Bearer ${token}` // Dodanie tokena do nagłówka
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Drivers:", data);
        // Assuming data is an array of drivers
        const formattedDrivers = data.map((driver) => ({
          label: driver.license_info, // Używamy license_info jako label
          value: driver.employee_id, // Używamy employee_id jako value
        }));
        setDriversData(formattedDrivers);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleDriverChange = (value) => {
    setSelectedDriver(value);
    console.log('Selected Driver:', value);
  };

  const handleOrderChange = (value) => {
    setSelectedOrder(value);
    console.log('Selected Order:', value);
  };

  const handleSubmit = () => {
    const token = localStorage.getItem('jwt');
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ driver_id: selectedDriver })
    };

    fetch(`https://www.igorgawlowicz.pl/kegdelpol/order/orders/${selectedOrder}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log("Response:", data);
        // Additional logic on success if needed
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div className="container">
      <Navbar />
      
        <Quote quoteText="Did you know that beer intake protects the body against radiation?" />
        <div className="heading">
          <span>ASSIGN</span> THE DRIVER
        </div>
        <div className="inputs-container">
          <DropDownInput label="Select Driver" options={driversData} onChange={handleDriverChange} />
          <DropDownInput label="Select Order" options={ordersData} onChange={handleOrderChange} />
        </div>
        <ConfirmButton buttonText="CONFIRM" onClick={handleSubmit} />
      
      <Footer />
    </div>
  );
};

export default AssignTheDriverUI;
