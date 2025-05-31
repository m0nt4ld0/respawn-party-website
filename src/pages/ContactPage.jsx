import ContactForm from '../components/ContactForm';
import Content from '../layouts/Content';

function ContactPage() {
  return (
    <div className="mt-5">
      <Content>
        <ContactForm onSubmit={console.log}/>
      </Content>
    </div>
  );
}

export default ContactPage;
