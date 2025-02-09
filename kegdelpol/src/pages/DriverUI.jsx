import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import DropDownInput from "../Components/DropDownInputDriver";
import OrderList from "../Components/OrderList";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DriverUI.css";
import LogoutButton from "../Components/LogoutButton";
import { useNavigate } from "react-router-dom";

const DriverUI = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("auth_id");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    fetchOrders();
  }, []); // Empty dependency array ensures it runs only once on mount

  const fetchOrders = () => {
    fetch("https://www.igorgawlowicz.pl/kegdelpol/order/orders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Orders:", data);
        setOrdersData(data);
        setFilteredOrders(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleOrderChange = (orderId) => {
    if (orderId) {
      setFilteredOrders(ordersData.filter((order) => order.order_id === parseInt(orderId)));
    } else {
      setFilteredOrders(ordersData);
    }
  };

  return (
    <div className="driver-ui">
      <Navbar />
      <div className="container">
        <div className="driver-flex">
              <div className="action">Choose your action</div>
              <LogoutButton className="logout-button" onLogout={handleLogout} />
          </div>
        <DropDownInput
          label="Select Order"
          options={ordersData.map((order) => order.order_id.toString())}
          onChange={handleOrderChange}
        />
        <OrderList orders={filteredOrders} />
      </div>
      <Footer />
    </div>
  );
};

export default DriverUI;
