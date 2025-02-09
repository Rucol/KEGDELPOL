import React from 'react';
import OrderItem from './OrderItem';
import { ListGroup } from 'react-bootstrap';

const OrderList = ({ orders }) => {
  return (
    <ListGroup className="order-list">
      {orders.map((order) => (
        <OrderItem key={order.order_id} order={order} />
      ))}
    </ListGroup>
  );
};

export default OrderList;
