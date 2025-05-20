import ContactForm from '../components/ContactForm';
import Content from '../layouts/Content';

function ContactPage({ logueado, setLogueado }) {
  return (
    <Content logueado={logueado} setLogueado={setLogueado}>
      <ContactForm onSubmit={console.log} />
    </Content>
  );
}

export default ContactPage;
