import ContactForm from '../components/ContactForm';
import Footer from '../layouts/Footer';

function ContactPage() {
  return (
    <>
      <ContactForm onSubmit={console.log} />
      <Footer />
    </>
  );
}

export default ContactPage;
