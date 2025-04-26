import React, { createContext, useState, useEffect } from 'react';

export const ShoppingCartContext = createContext();

function ShoppingCart({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (producto) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.producto.ID === producto.ID);

      if (itemIndex !== -1) {
        return prevCart.map((item, index) =>
          index === itemIndex ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

      return [...prevCart, { producto, cantidad: 1 }];
    });
  };

  const removeFromCart = (producto) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.producto.ID === producto.ID);
  
      if (itemIndex !== -1) {
        if (prevCart[itemIndex].cantidad > 1) {
          return prevCart.map((item, index) =>
            index === itemIndex
              ? { ...item, cantidad: item.cantidad - 1 }
              : item
          );
        } else {
          return prevCart.filter((item) => item.producto.ID !== producto.ID);
        }
      }
  
      return prevCart;
    });
  };

  const emptyCart = () => {
    setCart([]);
  };

  return (
    <ShoppingCartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCart;
