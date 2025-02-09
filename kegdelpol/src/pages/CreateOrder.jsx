import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import DropDownInput from "../Components/DropDownInputDriver";
import SubmitButton from "../Components/SubmitButton";
import InputQuantity from "../Components/InputQuantity";
import ItemList from "../Components/ItemList";
import Quote from "../Components/Quote";

const CreateOrder = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [totalCost, setTotalCost] = useState(0);
  const [itemId, setItemId] = useState(null); // Przechowuje tylko id wybranego przedmiotu
  const [addItemClicked, setAddItemClicked] = useState(false);
  const [availableItems, setAvailableItems] = useState([]);
  const [customerId, setCustomerId] = useState(null); // Przechowuje id klienta

  useEffect(() => {
    // Pobranie customer_id z local storage
    const customerIdFromStorage = localStorage.getItem("auth_id");
    setCustomerId(customerIdFromStorage);

    // Pobranie danych z serwera z uwzględnieniem tokena JWT
    const token = localStorage.getItem("jwt"); // Pobranie tokena JWT z localStorage

    fetch("https://www.igorgawlowicz.pl/kegdelpol/employee/get_all_products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Dodanie tokena do nagłówka
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAvailableItems(data);
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  const handleItemChange = (item) => {
    const selectedItemData = availableItems.find((i) => i.name === item);
    if (selectedItemData) {
      setSelectedItem(item);
      setItemId(selectedItemData.product_id); // Ustawienie itemId na product_id
      // Aktualizacja ceny tylko jeśli selectedItemData istnieje
      setTotalCost(selectedItemData.price * quantity);
    }
  };

  const handleQuantityChange = (value) => {
    setQuantity(parseInt(value));
    // Sprawdź, czy itemId nie jest null przed aktualizacją ceny
    if (itemId !== null) {
      const selectedItemData = availableItems.find(
        (i) => i.product_id === itemId
      );
      if (selectedItemData) {
        setTotalCost(selectedItemData.price * parseInt(value));
      }
    }
  };

  const handleAddItem = () => {
    // Zaktualizuj tylko itemId
    const selectedItemData = availableItems.find(
      (item) => item.name === selectedItem
    );
    if (selectedItemData) {
      setItemId(selectedItemData.product_id);
      setAddItemClicked(true);
    }
  };

  const handleRemoveItem = () => {
    // Usuń wybrany przedmiot
    setItemId(null);
    setAddItemClicked(false);
  };

  const handleSendItemsList = () => {
    // Przygotowanie danych do wysłania na serwer
    const totalPrice = totalCost; // Całkowita cena

    const dataToSend = {
      customer_id: customerId, // Dodaj auth_id do wysyłanych danych
      product_id: itemId, // Przekazanie itemId
      quantity: quantity, // Przekazanie quantity
      total_price: totalPrice, // Przekazanie total_price
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };
    console.log(JSON.stringify(dataToSend));

    // Wysłanie danych na serwer
    fetch("https://www.igorgawlowicz.pl/kegdelpol/order/orders", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response:", data);
        // Możesz obsłużyć odpowiedź serwera tutaj
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <div className="create-order-container">
      <Navbar />
      <div className="container">
        <Quote quoteText="Did you know that Germany collects over 1,000 tons of trash after the Oktoberfest?" />
        <div className="heading"><span>CREATE</span> NEW ORDER</div>
        
          {/* Sprawdź, czy availableItems nie jest puste */}
          <div className="order-flexbox">
          {availableItems.length > 0 && (
            <DropDownInput
              label="Select Item"
              options={availableItems.map((item) => item.name)}
              onChange={handleItemChange}
            />
          )}
          <InputQuantity
            value={quantity}
            onChange={(value) => handleQuantityChange(value)}
            placeholder="Enter quantity"
          />
          <p>Total: ${totalCost}</p>
          <SubmitButton buttonText="Add Item" onClick={handleAddItem} />
          </div>
        {addItemClicked && itemId !== null && (
          <>
          <div className="price-flexbox">
            {/* Przekazanie tylko itemId do ItemList */}
            <ItemList
              items={[{ id: itemId, name: selectedItem, quantity: quantity }]}
              availableItems={availableItems}
              onRemoveItem={handleRemoveItem}
            />

            <SubmitButton 
              className="submit-flex"
              buttonText="Send Items List"
              onClick={handleSendItemsList}
            />
            
          </div>
          </>
          
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CreateOrder;
