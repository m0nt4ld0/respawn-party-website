import { useState, useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import Content from '../layouts/Content';

function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const RATE_LIMIT_KEY = 'contact_form_submissions';
  const MAX_SUBMISSIONS = 3;
  const WINDOW_TIME = 60 * 60 * 1000;
  const COOLDOWN_TIME = 15 * 60 * 1000;

  useEffect(() => {
    checkRateLimit();
  }, []);

  const checkRateLimit = () => {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    if (!stored) return;

    const data = JSON.parse(stored);
    const now = Date.now();

    if (data.blockedUntil && now < data.blockedUntil) {
      setIsBlocked(true);
      setTimeLeft(Math.ceil((data.blockedUntil - now) / 1000));
      startCountdown(data.blockedUntil);
      return;
    }

    const recentSubmissions = data.submissions?.filter(
      timestamp => now - timestamp < WINDOW_TIME
    ) || [];

    if (recentSubmissions.length !== data.submissions?.length) {
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({
        submissions: recentSubmissions,
        blockedUntil: null
      }));
    }
  };

  const startCountdown = (blockedUntil) => {
    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.ceil((blockedUntil - now) / 1000);
      
      if (remaining <= 0) {
        setIsBlocked(false);
        setTimeLeft(0);
        clearInterval(interval);
        localStorage.removeItem(RATE_LIMIT_KEY);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const breadcrumbItems = [
    { to: '/', label: 'Inicio' },
    { label: 'Contactanos', active: true }
  ];

  const handleFormSubmit = async (formData) => {
    if (isBlocked) {
      setSubmitMessage(`Demasiados envíos. Espera ${formatTime(timeLeft)} antes de intentar nuevamente.`);
      return;
    }

    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const data = stored ? JSON.parse(stored) : { submissions: [] };
    const now = Date.now();

    const recentSubmissions = data.submissions.filter(
      timestamp => now - timestamp < WINDOW_TIME
    );

    if (recentSubmissions.length >= MAX_SUBMISSIONS) {
      const blockedUntil = now + COOLDOWN_TIME;
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({
        submissions: recentSubmissions,
        blockedUntil
      }));
      setIsBlocked(true);
      setTimeLeft(Math.ceil(COOLDOWN_TIME / 1000));
      startCountdown(blockedUntil);
      setSubmitMessage(`Has alcanzado el límite de ${MAX_SUBMISSIONS} envíos por hora. Espera ${formatTime(Math.ceil(COOLDOWN_TIME / 1000))} antes de intentar nuevamente.`);
      return;
    }

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
        
        const updatedSubmissions = [...recentSubmissions, now];
        localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({
          submissions: updatedSubmissions,
          blockedUntil: null
        }));

        setSubmitMessage('¡Mensaje enviado correctamente! Te responderemos pronto.');
        
        if (updatedSubmissions.length === MAX_SUBMISSIONS - 1) {
          setTimeout(() => {
            setSubmitMessage(prev => prev + ' <br />Nota: Solo puedes enviar 1 mensaje más en la próxima hora.');
          }, 2000);
        }
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
        <div className={`alert ${
          submitMessage.includes('correctamente') ? 'alert-success' : 
          submitMessage.includes('límite') || submitMessage.includes('Espera') ? 'alert-warning' : 
          'alert-danger'
        } mx-auto`} 
             style={{ maxWidth: '600px' }}
             dangerouslySetInnerHTML={{ __html: submitMessage}}>
        </div>
      )}
      <ContactForm 
        onSubmit={handleFormSubmit} 
        isSubmitting={isSubmitting}
        isBlocked={isBlocked}
      />
    </Content>
  );
}

export default ContactPage;