import React, { useState, useEffect } from 'react';
import StatusButton from './StatusButton';
import { ListGroupItem, Row, Col } from 'react-bootstrap';
import './OrderItem.css';

const OrderItem = ({ order }) => {
  const [status, setStatus] = useState(order.status);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    updateOrderStatus(newStatus);
  };

  const updateOrderStatus = (newStatus) => {
    const token = localStorage.getItem('jwt');
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus }),
    };
    console.log(JSON.stringify({ status: newStatus }));

    fetch(`https://www.igorgawlowicz.pl/kegdelpol/order/orders/${order.order_id}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Order updated:", data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  useEffect(() => {
    setStatus(order.status); // Ensure status sync when order changes
  }, [order]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <ListGroupItem className="order-item">
      <Row>
        <Col md={3}>
          <div><strong>Order ID: {order.order_id}</strong></div>
        </Col>
        <Col md={3}>
          <div>Order Date: <br /> {formatDate(order.order_date)}</div>
        </Col>
        <Col md={3}>
          <div>Delivery Date: <br /> {formatDate(order.delivery_date)}</div>
        </Col>
        <Col md={3}>
          <Row>
            <Col md={6}>
              <div>Status: {status}</div>
            </Col>
            <Col md={6}>
              <div className="status-button">
                <StatusButton currentStatus={status} onStatusChange={handleStatusChange} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </ListGroupItem>
  );
};

export default OrderItem;
