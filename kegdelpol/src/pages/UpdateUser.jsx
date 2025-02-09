import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import UserList from '../Components/UserList';
import Quote from '../Components/Quote';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UpdateUser.css';
import UserSearchInput from '../Components/UserSearchInput'; // Importujemy komponent UserSearchInput

const UpdateUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Pobranie tokena JWT z localStorage
        const token = localStorage.getItem('jwt');
  
        const response = await fetch('https://www.igorgawlowicz.pl/kegdelpol/auth/get_all_users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Dodanie tokena do nagłówka
          }
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);
  

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Filtruj użytkowników na bieżąco po zmianie wyszukiwanej frazy
    const filtered = users.filter(user => 
      user.login.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleRoleChange = (id, newRole) => {
    if (!['employee', 'client', 'driver'].includes(newRole)) {
      console.error('Invalid role:', newRole);
      return;
    }
    
    const updatedUsersList = users.map(user => 
      user.auth_id === id ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsersList);
    setFilteredUsers(updatedUsersList);

    const token = localStorage.getItem('jwt');
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({role: newRole }),
    };
    console.log(JSON.stringify({role: newRole }));

    fetch(`https://www.igorgawlowicz.pl/kegdelpol/auth/modify/${id}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Response:', data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div className="update-user-container">
      <Navbar />
      <div className="container">
        <Quote quoteText="Do you know that Budweiser is the world’s most famous beer?" />
        <div className="heading">
          <span>CHOOSE</span> THE USER TO UPDATE
        </div>
        <div className="update-user-search-container">
          <UserSearchInput
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Type User name"
          />
        </div>
        <UserList users={filteredUsers} onRoleChange={handleRoleChange} />
      </div>
      <Footer />
    </div>
  );
};

export default UpdateUser;
