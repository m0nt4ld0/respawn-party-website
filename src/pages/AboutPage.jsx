import Content from '../layouts/Content';

function AboutPage() {
  return (
    <Content
      title="Somos Talento Games"
      breadcrumbItems={[
        { label: 'Inicio', to: '/', active: false },
        { label: 'Nosotros', active: true },
      ]}
    >
      <div className="mt-5">
        <p>Somos un emprendimiento dedicado a la venta de consolas de videojuegos y videojuegos retro.</p>
        <p>Contamos con un equipo de profesionales que te asesoran para que puedas disfrutar de la mejor experiencia de videojuegos.</p>
      </div>
    </Content>
  );
}

export default AboutPage;
