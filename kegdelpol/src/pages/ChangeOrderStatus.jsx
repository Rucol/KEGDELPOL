import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import DropDownInput from '../Components/DropDownInput'; // Użyjemy tego samego komponentu DropDownInput co w DriverUI
import OrderList from '../Components/OrderList';
import Quote from '../Components/Quote';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChangeOrderStatus.css'; // Importujemy styl CSS dla ChangeOrderStatus
import SubmitButton from '../Components/SubmitButton';


const ChangeOrderStatus = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [updatedOrders, setUpdatedOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array ensures it runs only once on mount



  const fetchOrders = () => {
    const token = localStorage.getItem('jwt'); // Pobranie tokena JWT z localStorage
    fetch('https://www.igorgawlowicz.pl/kegdelpol/order/orders', {
      headers: {
        'Authorization': `Bearer ${token}` // Dodanie tokena do nagłówka
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Orders:', data);
        setOrdersData(data);
        setFilteredOrders(data);
        setUpdatedOrders(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };
  

  const handleOrderChange = (orderId) => {
    if (orderId) {
      setFilteredOrders(ordersData.filter((order) => order.order_id === parseInt(orderId)));
    } else {
      setFilteredOrders(ordersData);
    }
  };

  const handleUpdateOrder = (updatedOrder) => {
    setUpdatedOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.order_id === updatedOrder.order_id ? updatedOrder : order
      )
    );
  };

  const handleSubmitChanges = () => {
    const token = localStorage.getItem('jwt');
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedOrders), // Wysyłamy zaktualizowane zamówienia
    };

    fetch(`https://www.igorgawlowicz.pl/kegdelpol/orders/`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Response:', data);
        // Tutaj możesz obsłużyć odpowiedź, jeśli to konieczne
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
    console.log('Updated orders:', updatedOrders);
  };

  return (
    <div className="change-order-status-container">
      <Navbar />
      
      <div className="container">
      <Quote quoteText="Did you know that small consumption of beer reduces the risk of ulcers?"/>
      <div className="heading"><span>CHANGE</span> ORDER STATUS</div>
        <DropDownInput
          label="Select Order"
          options={ordersData.map((order) => ({ label: `Order ${order.order_id}`, value: order.order_id.toString() }))}
          onChange={handleOrderChange}
        />
        <OrderList orders={filteredOrders} onUpdateOrder={handleUpdateOrder} />
        <SubmitButton buttonText="SUBMIT" onClick={handleSubmitChanges} />
      </div>
      <Footer />
    </div>
  );
};

export default ChangeOrderStatus;
