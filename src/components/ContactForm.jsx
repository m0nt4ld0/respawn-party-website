import PropTypes from 'prop-types';
import useForm from '../hooks/useForm';

function ContactForm({ onSubmit }) {
  const { formData, handleChange, resetForm } = useForm({
    nombre: '',
    email: '',
    consulta: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSubmit(formData); 
    resetForm(); 
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
