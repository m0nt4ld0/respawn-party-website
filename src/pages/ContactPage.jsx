import {
  Container,
  Breadcrumb
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import Content from '../layouts/Content';

function ContactPage() {
  return (
      <Content>
        <div className="angled-background" />
        <Container className="py-4">
          <div className="header-hero">
            <h1>Contactanos</h1>
          </div>
          <Breadcrumb className="bg-transparent px-0 mb-4">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Inicio</Breadcrumb.Item>
            <Breadcrumb.Item active>Contactanos</Breadcrumb.Item>
          </Breadcrumb>
          <ContactForm onSubmit={console.log}/>
        </Container>
      </Content>
  );
}

export default ContactPage;
