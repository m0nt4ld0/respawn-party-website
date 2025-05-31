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
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm rounded-3 p-4">
            <h3 className="mb-4 text-center">Formulario de Contacto</h3>
            <form onSubmit={handleSubmit}>
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

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ContactForm;
