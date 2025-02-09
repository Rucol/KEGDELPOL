import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderStatus = ({ order, onTotalCost }) => {
  const { status, createdAt, deliveryDate, items } = order;
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const calculatedTotalCost = items.reduce((total, item) => total + item.quantity * item.price, 0);
    setTotalCost(calculatedTotalCost);
    onTotalCost(calculatedTotalCost);
  }, [items, onTotalCost]);

  return (
    <div className="container mt-4 p-4 border rounded">
      <h2 className="text-center mb-4">Order Status: {status}</h2>
      <hr />
      <div className="mb-3">
        <p>Created at: {new Date(createdAt).toLocaleDateString()}</p>
        <p>Delivery date: {new Date(deliveryDate).toLocaleDateString()}</p>
      </div>
      <hr />
      <div className="mb-3">
        {items.map((item, index) => (
          <div key={index} className="d-flex justify-content-between mb-2">
            <span>{item.name}&nbsp;</span>
            <span>{item.quantity} x ${item.price.toFixed(2)}</span>
            <span className="ml-3">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${(item.quantity * item.price).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <hr />
      <div className="text-right font-weight-bold">
        <span>Total: ${totalCost.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderStatus;
