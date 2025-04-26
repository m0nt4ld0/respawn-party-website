import React, { createContext, useState } from 'react';

const ShoppingCartContext = createContext();

function ShoppingCart({children}) {
    const [cart, setCart] = useState([]);
    const addToCart = (producto) => {
        setCart([...cart, producto]);
    };
    const emptyCart = () => {
        setCart([]);
    };
    return (
        <ShoppingCartContext.Provider value={{ cart, addToCart, emptyCart }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}

export default ShoppingCart;