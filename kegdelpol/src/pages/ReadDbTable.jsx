import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ButtonSelect from '../Components/ButtonSelect';
import UserSearchInput from '../Components/UserSearchInput';
import Table from '../Components/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReadDbTable.css';
import Quote from '../Components/Quote';

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);

  const handleButtonSelect = (category) => {
    setSelectedCategory(category);
    setSearchTerm(''); // Reset search term when category changes
  };

  const fetchUsers = () => {
    const token = localStorage.getItem('jwt');
    fetch('https://www.igorgawlowicz.pl/kegdelpol/auth/get_all_users', {
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
        setTableData(data);
        setTableColumns(['Id', 'Login', 'Role']);
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  const fetchOrders = () => {
    const token = localStorage.getItem('jwt');
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
        setTableData(data);
        setTableColumns(['ClientID', 'DeliveryDate', 'OrderDate', 'OrderID', 'Status', 'Weight']);
      })
      .catch(error => console.error('Error fetching orders:', error));
  };

  const fetchVehicles = () => {
    const token = localStorage.getItem('jwt');
    fetch('https://www.igorgawlowicz.pl/kegdelpol/employee/get_all_vehicles', {
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
        console.log("Fetched vehicles:", data);
        setTableData(data);
        setTableColumns(['Capacity', 'Registration', 'Type', 'Id']);
        console.log(data);
      })
      .catch(error => console.error('Error fetching vehicles:', error));
  };

  useEffect(() => {
    if (selectedCategory === 'users') {
      fetchUsers();
    } else if (selectedCategory === 'orders') {
      fetchOrders();
    } else if (selectedCategory === 'vehicle') {
      fetchVehicles();
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (searchTerm !== '') {
      const filteredData = tableData.filter(item => {
        if (selectedCategory === 'users') {
          return item.username.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (selectedCategory === 'orders') {
          return item.orderDate.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (selectedCategory === 'vehicle') {
          return item.vehicleType.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
      setTableData(filteredData);
    } else {
      if (selectedCategory === 'users') {
        fetchUsers();
      } else if (selectedCategory === 'orders') {
        fetchOrders();
      } else if (selectedCategory === 'vehicle') {
        fetchVehicles();
      }
    }
  }, [searchTerm, selectedCategory]);

  return (
    <div className="page">
      <Navbar />
      <div className="container">
        <Quote quoteText="Did you know that China consumes the most beer as a whole?" />
        <div className="heading">
          <span>READ</span> THE DATABASE
        </div>
        <ButtonSelect onSelect={handleButtonSelect} />
        <UserSearchInput 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Search..."
        />
        {tableData.length > 0 && <Table data={tableData} columns={tableColumns} updateButtonText="Update" deleteButtonText="Remove" />}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
