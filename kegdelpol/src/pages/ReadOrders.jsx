import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import OrderStatus from '../Components/Order';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserSearchInput from '../Components/UserSearchInput';
import DropDownInput from '../Components/DropDownInputDriver';
import ButtonSelect from '../Components/ButtonsOrders';
import Quote from '../Components/Quote';

const ReadOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Pobranie tokena JWT z localStorage
    const token = localStorage.getItem('jwt');
  
    // Pobieranie danych z endpointu "/order/orders"
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
        // Filtrujemy i modyfikujemy dane, aby zawierały tylko potrzebne informacje
        const modifiedOrders = data.map(order => ({
          status: order.status,
          createdAt: order.order_date,
          deliveryDate: order.delivery_date,
          items: [],
        }));
        setOrders(modifiedOrders);
      })
      .catch(error => console.error('Error fetching orders:', error));
  
    // Pobieranie danych z endpointu "/employee/get_all_products"
    fetch('https://www.igorgawlowicz.pl/kegdelpol/employee/get_all_products', {
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
        setProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  

  const getTotalPrice = (order) => {
    return order.items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusSelect = (status) => {
    setFilterStatus(status);
  };

  const handleSortByChange = (option) => {
    setSortBy(option);
  };

  const handleTotalCost = (totalCost) => {
    console.log('Total cost:', totalCost);
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = !filterStatus || order.status === filterStatus;
    return matchesStatus;
  });

  const sortedOrders = filteredOrders.sort((a, b) => {
    switch (sortBy) {
      case 'Delivery date':
        return new Date(a.deliveryDate) - new Date(b.deliveryDate);
      case 'Total(min)':
        return getTotalPrice(a) - getTotalPrice(b);
      case 'Total(max)':
        return getTotalPrice(b) - getTotalPrice(a);
      case 'CreatedAt':
        return new Date(a.createdAt) - new Date(b.createdAt);
      default:
        return 0;
    }
  });

  return (
    <div className="read-orders-container">
      <Navbar />
      <div className="container">
      <Quote quoteText="Did you know that The economy of the United States benefits from beer sales?" />
      <div className="heading"><span>ORDERS</span> LIST</div>
      <UserSearchInput
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by item name..."
      />
      <ButtonSelect onSelect={handleStatusSelect} />
      <DropDownInput
        label="Sort By"
        options={['Delivery date', 'Total(min)','Total(max)', 'CreatedAt']}
        onChange={handleSortByChange}
      />
      {sortedOrders.map((order, index) => (
        <div key={index}>
          <OrderStatus order={order} onTotalCost={handleTotalCost} />
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>{item.name} - {item.price}</li>
            ))}
          </ul>
        </div>
      ))}
      <Footer />
    </div>
    </div>
    
  );
};

export default ReadOrders;
