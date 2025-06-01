import ContactForm from '../components/ContactForm';
import Content from '../layouts/Content';

function ContactPage() {
  const breadcrumbItems = [
    { to: '/', label: 'Inicio' },
    { label: 'Contactanos', active: true }
  ];

  return (
    <Content title="Contactanos" breadcrumbItems={breadcrumbItems}>
      <ContactForm onSubmit={console.log} />
    </Content>
  );
}

export default ContactPage;
