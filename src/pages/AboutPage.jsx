import {
  Container,
  Breadcrumb
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Content from '../layouts/Content';

function AboutPage() {
  return (
      <Content>
        <div className="angled-background" />
        <Container className="py-4">
        <div className="header-hero">
          <h1>Somos Talento Games</h1>
        </div>

        <Breadcrumb className="bg-transparent px-0 mb-4">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Inicio</Breadcrumb.Item>
            <Breadcrumb.Item active>Nosotros</Breadcrumb.Item>
          </Breadcrumb>
          <div className="mt-5">
            <p>Somos un emprendimiento dedicado a la venta de consolas de videojuegos y videojuegos retro.</p>
            <p>Contamos con un equipo de profesionales que te asesoran para que puedas disfrutar de la mejor experiencia de videojuegos.</p>
          </div>
        </Container>
        
      </Content>
  );
}

export default AboutPage;
