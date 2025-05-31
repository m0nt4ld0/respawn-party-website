import React, { useContext } from 'react';
import { ListGroup, Button, Container } from 'react-bootstrap';
import { ShoppingCartContext } from '../contexts/ShoppingCartContext';
import { useNavigate } from 'react-router-dom';
import Content from '../layouts/Content';

function ShoppingCartPage() {
  const { cart, addToCart, removeFromCart, emptyCart } = useContext(ShoppingCartContext);

  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => {
    const price = Number(item.producto?.ID) || 0;
    return acc + item.cantidad * price;
  }, 0);

  return (
    <Content>
      <h1>Mi carrito</h1>
      <Container className="mt-4">
        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <>
            <ListGroup>
              {cart.map((item, index) => {
                const price = Number(item.producto?.ID) || 0;
                const subtotal = price * item.cantidad;

                return (
                  <ListGroup.Item key={index} className="bg-dark text-light">
                    <div className="row align-items-center">
                      <div className="col-12 col-md-1 d-flex justify-content-center mb-2 mb-md-0">
                        <img
                          src={`https://retroachievements.org/${item.producto?.ImageIcon}`}
                          alt={item.producto?.Title || 'Producto'}
                          className="img-fluid"
                          style={{ maxHeight: '50px', objectFit: 'contain' }}
                        />
                      </div>
                      <div className="col-12 col-md-7 text-center text-md-start mb-2 mb-md-0">
                        <h6 className="mb-1">{item.producto?.Title || 'Sin título'}</h6>
                        <small>Precio unitario: ${price.toFixed(2)}</small><br />
                        <small>Subtotal: ${subtotal.toFixed(2)}</small>
                      </div>
                      <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end align-items-center gap-2">
                        <Button variant="primary" size="sm" onClick={() => addToCart(item.producto)}>+</Button>
                        <span>x{item.cantidad}</span>
                        <Button variant="danger" size="sm" onClick={() => removeFromCart(item.producto)}>-</Button>
                      </div>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>


            <div className="d-flex justify-content-end mt-3 mb-3">
              <h4>Total: ${total.toFixed(2)}</h4>
            </div>

            <div className="d-flex justify-content-between">
              <Button variant="outline-danger" onClick={emptyCart}>Vaciar carrito</Button>
              <Button variant="success" onClick={() => navigate('/checkout')}>
                Finalizar compra
              </Button>

            </div>
          </>
        )}
      </Container>
    </Content>
  );
}

export default ShoppingCartPage;
