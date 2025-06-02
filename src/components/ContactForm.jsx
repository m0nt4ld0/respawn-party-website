import PropTypes from 'prop-types';
import useForm from '../hooks/useForm';

function ContactForm({ onSubmit, isSubmitting, isBlocked }) {
  const { formData, handleChange, resetForm } = useForm({
    email: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    await onSubmit(formData); 
    resetForm(); 
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm rounded-3 p-4">
            <h3 className="mb-4 text-center form-title">¿Dudas? Escribinos</h3>
            <form onSubmit={handleSubmit}>
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
                  disabled={isSubmitting || isBlocked}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">Consulta</label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting || isBlocked}
                ></textarea>
              </div>

              <div className="d-grid">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting || isBlocked}
                >
                  {isBlocked ? 'Temporalmente bloqueado' : 
                   isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  isBlocked: PropTypes.bool
};

ContactForm.defaultProps = {
  isSubmitting: false,
  isBlocked: false
};

export default ContactForm;