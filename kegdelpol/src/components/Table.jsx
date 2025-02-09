import React from 'react';
import './Table.css'; // Zaimportuj plik stylów CSS
import Button from 'react-bootstrap/Button';

const Table = ({ data, columns, updateButtonText, deleteButtonText }) => {
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
              {updateButtonText && (
                <Button variant="primary">{updateButtonText}</Button>
              )}
              {deleteButtonText && (
                <Button variant="danger">{deleteButtonText}</Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
