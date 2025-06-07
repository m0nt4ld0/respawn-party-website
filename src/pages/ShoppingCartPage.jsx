import React, { useContext } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { ShoppingCartContext } from '../contexts/ShoppingCartContext';
import { Link, useNavigate } from 'react-router-dom';
import Content from '../layouts/Content';
import Swal from 'sweetalert2';

function ShoppingCartPage() {
  const { cart, addToCart, removeFromCart, emptyCart } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => {
    const price = Number(item.producto?.ID) || 0;
    return acc + item.cantidad * price;
  }, 0);

  const breadcrumbItems = [
    { to: '/', label: 'Inicio' },
    { label: 'Mi pedido', active: true }
  ];

  const handleEmptyCart = async () => {
    const result = await Swal.fire({
      title: '¿Vaciar carrito?',
      text: 'Esta acción eliminará todos los productos en su carrito. ¿Desea continuar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Vaciar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      focusConfirm: false,
      focusCancel: true
    });

    if (result.isConfirmed) {
      emptyCart();
      
      // Mostrar mensaje de confirmación
      await Swal.fire({
        title: '¡Carrito vaciado!',
        text: 'Todos los productos han sido eliminados del carrito.',
        icon: 'success',
        confirmButtonColor: '#198754',
        confirmButtonText: 'Entendido',
        timer: 2000,
        timerProgressBar: true
      });
    }
  };

  return (
    <Content 
      title="Mi pedido - Talento Games"
      seoTitle="Inicio"
      seoDescription="Descubrí los mejores juegos y consolas en alquiler en Talento Games."
      seoKeywords="venta consolas, videojuegos, Talento Games"
      seoUrl="https://talento-games.vercel.app/"
      breadcrumbItems={breadcrumbItems}>
      {cart.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center flex-column py-5">
          <img
            src="/images/8219549_empty_question_search_empty states_basket_icon.webp"
            alt="Carrito vacío"
            className="mb-4"
            style={{ width: '250px', height: 'auto', opacity: 0.8 }}
          />
          <h4 className="text-info">No hay productos en el carrito.</h4>
          <button
            className="btn btn-outline-primary mt-4"
            onClick={() => navigate('/consoles')}
          >
            Ver catálogo
          </button>
        </div>
      ) : (
        <>
<ListGroup>
  {cart.map((item, index) => {
    const price = Number(item.producto?.ID) || 0;
    const subtotal = price * item.cantidad;

    return (
      <div className="row align-items-center">
      <ListGroup.Item key={index} className="bg-dark text-light">
          {/* Columna izquierda: imagen y texto */}
          <div className="col-md-8 d-flex align-items-center">
            <img
              src={`https://retroachievements.org/${item.producto?.ImageIcon}`}
              alt={item.producto?.Title || 'Producto'}
              className="img-fluid me-3"
              style={{ width: '50px', height: '50px', objectFit: 'contain' }}
            />
            <div>
              <h6 className="mb-1">
                <Link to={`/product/${item.producto?.ID}`} className="text-light text-decoration-none">
                  {item.producto?.Title || 'Sin título'}
                </Link>
              </h6>
              <small>Precio unitario: ${price.toFixed(2)}</small><br />
              <small>Subtotal: ${subtotal.toFixed(2)}</small>
            </div>
          </div>

          {/* Columna derecha: botones */}
          <div className="col-md-4 d-flex justify-content-end align-items-center ">
            <Button
              variant="primary"
              size="sm"
              onClick={() => addToCart(item.producto)}
            >
              +
            </Button>
            <span className="fw-semibold">x{item.cantidad}</span>
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeFromCart(item.producto)}
            >
              −
            </Button>
          </div>
        
      </ListGroup.Item>
      </div>
    );
  })}
</ListGroup>




          <div className="d-flex justify-content-end mt-3 mb-3">
            <h4>Total: ${total.toFixed(2)}</h4>
          </div>

          <div className="d-flex justify-content-between">
            <Button variant="outline-primary" onClick={handleEmptyCart}>Vaciar carrito</Button>
            <Button variant="primary" onClick={() => navigate('/checkout')}>
              Finalizar compra
            </Button>
          </div>
        </>
      )}
    </Content>
  );
}

export default ShoppingCartPage;