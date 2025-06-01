import React, { useContext } from 'react';
import { ListGroup, Button, Container, Breadcrumb } from 'react-bootstrap';
import { ShoppingCartContext } from '../contexts/ShoppingCartContext';
import { useNavigate, Link } from 'react-router-dom';
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
      <div className="angled-background" />
      <Container className="mt-4">
      <div className="header-hero">
          <h1>Mi pedido</h1>
      </div>
      <Breadcrumb className="bg-transparent px-0 mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Inicio</Breadcrumb.Item>
        <Breadcrumb.Item active>Mi pedido</Breadcrumb.Item>
      </Breadcrumb>
      {cart.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center flex-column py-5">
          <img
            src="/images/8219549_empty_question_search_empty states_basket_icon.png"
            alt="Carrito vacío"
            className="mb-4"
            style={{ width: '250px', height: 'auto', opacity: 0.8 }}
          />
          <h4 className="text-info">No hay productos en el carrito.</h4>
          <Link to="/" className="btn btn-outline-primary mt-4">
            Volver al inicio
          </Link>
        </div>
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
              <Button variant="btn btn-outline-primary" onClick={emptyCart}>Vaciar carrito</Button>
              <Button variant="btn btn-primary" onClick={() => navigate('/checkout')}>
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
