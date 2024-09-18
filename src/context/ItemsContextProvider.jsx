import React, { createContext, useEffect, useState } from "react";
import { initialItems } from "../lib/lib";

export const ItemsContext = createContext();

export default function ItemsContextProvider({ children }) {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")) || initialItems);

  const handleAddItem = (newItemText) => {
    const newItem = {
      id: new Date().getTime(),
      name: newItemText,
      packed: false,
    };

    const newItems = [...items, newItem];

    setItems(newItems);
  };

  const handleDeleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleToggleItem = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) return { ...item, packed: !item.packed };
      return item;
    });
    setItems(newItems);
  };

  const handleRemoveAllItems = () => {
    setItems([]);
  };

  const handleResetToInitial = () => {
    setItems(initialItems);
  };

  const handleMarkAllAsComplete = () => {
    const markedItems = items.map((item) => ({
      ...item,
      packed: true,
    }));
    setItems(markedItems);
  };

  const handleMarkAllAsIncomplete = () => {
    const markedItems = items.map((item) => ({
      ...item,
      packed: false,
    }));
    setItems(markedItems);
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div>
      <ItemsContext.Provider
        value={{
          items,
          handleAddItem,
          handleDeleteItem,
          handleMarkAllAsComplete,
          handleMarkAllAsIncomplete,
          handleRemoveAllItems,
          handleResetToInitial,
          handleToggleItem,
        }}>
        {children}
      </ItemsContext.Provider>
    </div>
  );
}
