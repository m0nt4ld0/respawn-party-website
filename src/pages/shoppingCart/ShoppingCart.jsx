import React, { createContext, useState } from 'react';

export const ShoppingCartContext = createContext();

function ShoppingCart({children}) {
    const [cart, setCart] = useState([]);

    const addToCart = (producto) => {
        setCart((prevCart) => {
            const itemIndex = prevCart.findIndex(item => item.producto.ID === producto.ID);

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
            const itemIndex = prevCart.findIndex(item => item.producto.ID === producto.ID);

            if (itemIndex !== -1) {
                return prevCart.map((item, index) =>
                    index === itemIndex
                        ? { ...item, cantidad: item.cantidad > 1 ? item.cantidad - 1 : item.cantidad }
                        : item
                ).filter(item => item.cantidad > 0);
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
