import React from 'react';
import UserItem from './UserItem';
import { ListGroup } from 'react-bootstrap';

const UserList = ({ users, onRoleChange }) => {
  return (
    <ListGroup className="user-list">
      {users.map((user) => (
        <UserItem key={user.auth_id} user={user} onRoleChange={onRoleChange} />
      ))}
    </ListGroup>
  );
};

export default UserList;
