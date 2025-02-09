import React, { useState, useEffect } from 'react';
import { ListGroupItem, Row, Col, Dropdown } from 'react-bootstrap';
import './OrderItem.css';

const UserItem = ({ user, onRoleChange }) => {
  const [role, setRole] = useState(user.role);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    onRoleChange(user.auth_id, newRole);
  };

  useEffect(() => {
    setRole(user.role); // Ensure role sync when user changes
  }, [user]);

  return (
    <ListGroupItem className="user-item">
      <Row>
        <Col md={3}>
          <div><strong>ID: {user.auth_id}</strong></div>
        </Col>
        <Col md={3}>
          <div>Login: {user.login}</div>
        </Col>
        <Col md={3}>
          <div>Role: {role}</div>
        </Col>
        <Col md={3}>
          <Dropdown onSelect={handleRoleChange}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Change Role
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="employee">Employee</Dropdown.Item>
              <Dropdown.Item eventKey="driver">Driver</Dropdown.Item>
              <Dropdown.Item eventKey="client">Client</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </ListGroupItem>
  );
};

export default UserItem;
