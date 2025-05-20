import React, { useContext } from 'react';
import { ListGroup, Button, Container } from 'react-bootstrap';
import { ShoppingCartContext } from './shoppingCart/ShoppingCart';
import Content from '../layouts/Content';

function ShoppingCartPage({ logueado, setLogueado }) {
  const { cart, addToCart, removeFromCart, emptyCart } = useContext(ShoppingCartContext);

  return (
    <Content logueado={logueado} setLogueado={setLogueado}>
      <h1>Mi carrito</h1>
      <Container className="mt-4">
        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <ListGroup>
            {cart.map((item, index) => (
              <ListGroup.Item key={index} className="d-flex align-items-center">
                <img
                  src={`https://retroachievements.org/${item.producto.ImageIcon}`}
                  alt={item.producto.Title}
                  style={{ width: '40px', height: '40px', objectFit: 'contain', marginRight: '10px' }}
                />
                <div className="d-flex justify-content-between w-100">
                  <span>{item.producto.Title}</span>
                  <span>
                    (x{item.cantidad})
                    <Button variant="primary" size="sm" onClick={() => addToCart(item.producto)}>+</Button>
                    <Button variant="danger" size="sm" onClick={() => removeFromCart(item.producto)}>-</Button>
                  </span>
                </div>
              </ListGroup.Item>
            ))}
            <Button variant="primary" size="sm" onClick={() => emptyCart()}>Finalizar compra</Button>
          </ListGroup>
        )}
      </Container>
    </Content>
  );
}

export default ShoppingCartPage;
