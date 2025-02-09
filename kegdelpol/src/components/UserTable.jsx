import React, { useState } from 'react';
import './Table.css'; // Zaimportuj plik stylów CSS
import Button from 'react-bootstrap/Button';

const UserTable = ({ data, columns, updateButtonText, deleteButtonText, onRoleChange }) => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState('');

  const handleUpdateClick = (userId) => {
    setEditingUserId(userId);
  };

  const handleRoleChange = (event) => {
    setNewRole(event.target.value);
  };

  const handleRoleSubmit = (userId) => {
    onRoleChange(userId, newRole);
    setEditingUserId(null);
    setNewRole('');
  };

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((value, columnIndex) => (
              <td key={columnIndex}>{value}</td>
            ))}
            <td>
              {editingUserId === row.id ? (
                <>
                  <select value={newRole} onChange={handleRoleChange}>
                    <option value="">Select Role</option>
                    <option value="employee">Employee</option>
                    <option value="client">Client</option>
                    <option value="driver">Driver</option>
                  </select>
                  <Button variant="success" onClick={() => handleRoleSubmit(row.id)}>Save</Button>
                </>
              ) : (
                <>
                  {updateButtonText && (
                    <Button variant="primary" onClick={() => handleUpdateClick(row.id)}>{updateButtonText}</Button>
                  )}
                  {deleteButtonText && (
                    <Button variant="danger">{deleteButtonText}</Button>
                  )}
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
