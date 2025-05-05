import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const [cartDetails, setCartDetails] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  
  const increment = (index, product) => {
    setCartItem((prev) => {
      const newCount = (prev[index] || 0) + 1;
      setCartDetails((prevDetails) => {
        const itemIndex = prevDetails.findIndex((item) => item.name === product.name);
        if (itemIndex === -1) {
          return [
            ...prevDetails,
            {
              name: product.name,
              unitPrice: product.price,
              image: product.image.desktop,
              index,
            },
          ];
        }
        return prevDetails;
      });
      return { ...prev, [index]: newCount };
    });
  };

  
  const decrement = (index, product) => {
    setCartItem((prev) => {
      const newCount = (prev[index] || 0) - 1;
      if (newCount <= 0) {
        setCartDetails((prevDetails) =>
          prevDetails.filter((item) => item.name !== product.name)
        );
        return { ...prev, [index]: 0 };
      } else {
        return { ...prev, [index]: newCount };
      }
    });
  };

  const removeItem = (itemName, index) => {
    setCartDetails((prevDetails) =>
      prevDetails.filter((item) => item.name !== itemName)
    );
    setCartItem((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[index];
      return newCart;
    });
  };

 
  const handleAddToCart = (index, product) => {
    increment(index, product);
    setHoveredIndex(index); 
  };

  
  const totalItems = Object.values(cartItem).reduce((a, b) => a + b, 0);

  const total = cartDetails.reduce((sum, item) => {
    const quantity = cartItem[item.index] || 0;
    return sum + item.unitPrice * quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        products,
        setProducts,
        cartItem,
        setCartItem,
        cartDetails,
        setCartDetails,
        hoveredIndex,
        setHoveredIndex,
        confirmed,
        setConfirmed,
        increment,
        decrement,
        removeItem,
        handleAddToCart,
        totalItems,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};