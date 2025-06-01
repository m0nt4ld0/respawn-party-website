import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate,Link } from 'react-router-dom';
import { Modal, Container, Breadcrumb, Button } from 'react-bootstrap';
import useForm from '../hooks/useForm';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import Swal from 'sweetalert2';
import Content from '../layouts/Content';

export default function CheckoutPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { emptyCart } = useShoppingCart();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const { formData, handleChange, resetForm } = useForm({
    nombre: '',
    direccion: '',
    tarjeta: '',
    vencimiento: '',
    cvv: ''
  });

  useEffect(() => {
    if (!user) {
      setShowLoginPrompt(true);
    }
  }, [user]);

  const handleLoginRedirect = () => {
    setShowLoginPrompt(false);
    navigate('/login');
  };

  // Algoritmo de Luhn para validación de números de tarjeta de crédito
  function isValidCardNumber(number) {
    const sanitized = number.replace(/\D/g, '');
    let sum = 0;
    let shouldDouble = false;
  
    for (let i = sanitized.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitized[i]);
  
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
  
      sum += digit;
      shouldDouble = !shouldDouble;
    }
  
    return sum % 10 === 0;
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Tarjeta válida
    if (!isValidCardNumber(formData.tarjeta)) {
      Swal.fire({
        icon: 'error',
        title: 'Número de tarjeta inválido',
        text: 'Ingresá un número de tarjeta válido.',
      });
      return;
    }
  
    // Validar vencimiento (formato MM/AA y fecha futura)
    const expRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expRegex.test(formData.vencimiento)) {
      Swal.fire({
        icon: 'error',
        title: 'Fecha inválida',
        text: 'El vencimiento debe estar en formato MM/AA.',
      });
      return;
    } else {
      const [month, year] = formData.vencimiento.split('/');
      const expDate = new Date(`20${year}`, parseInt(month));
      const now = new Date();
      if (expDate < now) {
        Swal.fire({
          icon: 'error',
          title: 'Tarjeta vencida',
          text: 'La tarjeta ya expiró. Ingresá una fecha válida.',
        });
        return;
      }
    }
  
    const cvvRegex = /^\d{3,4}$/;
    if (!cvvRegex.test(formData.cvv)) {
      Swal.fire({
        icon: 'error',
        title: 'CVV inválido',
        text: 'El CVV debe tener 3 o 4 dígitos numéricos.',
      });
      return;
    }
  
    Swal.fire({
      icon: 'success',
      title: '¡Orden colocada!',
      text: 'Gracias por tu compra.',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      emptyCart();
      resetForm();
      navigate('/');
    });
  };
  
  

  if (!user) {
    return (
      <Modal show={showLoginPrompt} onHide={handleLoginRedirect} centered>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Debes iniciar sesión para completar la compra.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLoginRedirect}>
            Ir a iniciar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className="mt-5">
    <Content>
    <div className="angled-background" />
    <Container className="mt-4">
      <div className="header-hero">
          <h1>Finalizar compra</h1>
      </div>
      <Breadcrumb className="bg-transparent px-0 mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Inicio</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/shopping-cart' }}>Mi pedido</Breadcrumb.Item>
        <Breadcrumb.Item active>Finalizar compra</Breadcrumb.Item>
      </Breadcrumb>
      
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-sm rounded-3 p-4">
              <h3 className="mb-4 text-center form-title">Ya casi es tuyo...</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Tu nombre completo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="direccion" className="form-label">Dirección de envío</label>
                  <input
                    type="text"
                    className="form-control"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="tarjeta" className="form-label">Número de tarjeta</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tarjeta"
                    name="tarjeta"
                    value={formData.tarjeta}
                    onChange={handleChange}
                    required
                    maxLength="16"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="vencimiento" className="form-label">Vencimiento</label>
                    <input
                      type="text"
                      className="form-control"
                      id="vencimiento"
                      name="vencimiento"
                      value={formData.vencimiento}
                      onChange={handleChange}
                      placeholder="MM/AA"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="cvv" className="form-label">CVV</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                      maxLength="4"
                    />
                  </div>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Finalizar compra</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    
    </Content>
    </div>
  );
}
