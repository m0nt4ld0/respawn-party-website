import PropTypes from 'prop-types';
import { useState } from 'react';

function ContactForm({ onSubmit }) { // ContactForm es un componente
  // useState es un hook de React
  // formData y setFormData son variables reactivas (del estado interno del componente)
  // formData es el valor y setFormData, la manera de cambiarlo
  const [formData, setFormData] = useState({ 
    nombre: '',
    email: '',
    consulta: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData, // Operador de propagación (Javascript ES6+)
      [name]: value // Copia todo el objeto a uno nuevo y cambia solo el valor de name
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // evita que recargue la pagina
    onSubmit(formData); // ejecuta la funcion con los datos que nos pasaron
    setFormData({ nombre: '', email: '', consulta: '' }); // limpia el formulario
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
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
        <label htmlFor="email" className="form-label">Correo electrónico</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="consulta" className="form-label">Consulta</label>
        <textarea
          className="form-control"
          id="consulta"
          name="consulta"
          rows="4"
          value={formData.consulta}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary">Enviar</button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ContactForm;
