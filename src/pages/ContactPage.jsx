import ContactForm from '../components/ContactForm';
import Content from '../layouts/Content';

function ContactPage() {
  return (
    <Content>
      <ContactForm onSubmit={console.log} />
    </Content>
  );
}

export default ContactPage;
