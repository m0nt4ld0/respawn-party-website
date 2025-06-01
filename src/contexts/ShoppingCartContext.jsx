import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

export const ShoppingCartContext = createContext();

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

function ShoppingCartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (producto) => {
    let itemExists = false;
  
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.producto.ID === producto.ID);
      let newCart;
  
      if (itemIndex !== -1) {
        itemExists = true;
        newCart = prevCart.map((item, index) =>
          index === itemIndex ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        newCart = [...prevCart, { producto, cantidad: 1 }];
      }
  
      return newCart;
    });
  
    toast.success('Producto agregado al carrito');
  };

  const removeFromCart = (producto) => {
    let removed = false;
  
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.producto.ID === producto.ID);
      let newCart = prevCart;
  
      if (itemIndex !== -1) {
        removed = true;
  
        if (prevCart[itemIndex].cantidad > 1) {
          newCart = prevCart.map((item, index) =>
            index === itemIndex
              ? { ...item, cantidad: item.cantidad - 1 }
              : item
          );
        } else {
          newCart = prevCart.filter((item) => item.producto.ID !== producto.ID);
        }
      }
  
      return newCart;
    });
  
    if (removed) toast.info('Producto eliminado del carrito');
  };

  const emptyCart = () => {
    setCart([]);
    toast.warn('Carrito vacío');
  };

  return (
    <ShoppingCartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
