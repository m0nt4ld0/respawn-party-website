import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
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

  const handleSubmit = (e) => {
    e.preventDefault();

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
      <div className="row justify-content-center mt-5">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm rounded-3 p-4">
            <h3 className="mb-4 text-center form-title">Finalizar Compra</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre completo</label>
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
    
    </Content>
    </div>
  );
}
