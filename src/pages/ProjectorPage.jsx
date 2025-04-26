import Content from '../layouts/Content';
import Product from './shoppingCart/Product';

function ProjectorPage() {
  return (
    <Content>
      <h1>Juegos para NES</h1>
      <p>Contamos con un equipo de profesionales que te asesoran para que puedas disfrutar de la mejor experiencia de videojuegos.</p>
      
      <Product consoleId={24} />
    </Content>
  );
}

export default ProjectorPage;