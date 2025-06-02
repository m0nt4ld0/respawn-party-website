import { useState } from 'react';
import ContactForm from '../components/ContactForm';
import Content from '../layouts/Content';

function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const breadcrumbItems = [
    { to: '/', label: 'Inicio' },
    { label: 'Contactanos', active: true }
  ];

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('¡Mensaje enviado correctamente! Te responderemos pronto.');
      } else {
        throw new Error('Error en el envío');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSubmitMessage('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Content title="Contactanos" breadcrumbItems={breadcrumbItems}>
      {submitMessage && (
        <div className={`alert ${submitMessage.includes('correctamente') ? 'alert-success' : 'alert-danger'} mx-auto`} 
             style={{ maxWidth: '600px' }}>
          {submitMessage}
        </div>
      )}
      <ContactForm 
        onSubmit={handleFormSubmit} 
        isSubmitting={isSubmitting}
      />
    </Content>
  );
}

export default ContactPage;