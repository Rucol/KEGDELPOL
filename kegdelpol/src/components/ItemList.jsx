import React from 'react';

const ItemList = ({ items, availableItems, onRemoveItem }) => {
  // Funkcja do pobierania ceny na podstawie itemId
  const getPriceById = (itemId) => {
    const selectedItem = availableItems.find((item) => item.id === itemId);
    return selectedItem ? selectedItem.price : 0; // Zwróć cenę lub 0, jeśli przedmiot nie został znaleziony
  };

  // Oblicz całkowitą wartość cen wszystkich przedmiotów na liście
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Items List</h2>
      <ul className="list-group">
        {items.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{item.name} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}</span>
            <button className="btn btn-danger" onClick={() => onRemoveItem(index)}>Remove</button> {/* Popraw wywołanie onRemoveItem */}
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
};

export default ItemList;
