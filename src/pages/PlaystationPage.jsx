import Content from '../layouts/Content';
import Product from './shoppingCart/Product';

function PlaystationPage() {
  return (
    <Content>
      <h1>PlayStation</h1>
      <p>Explora las increíbles posibilidades de juego con una consola que supera lo extraordinario.</p>
      <p>Contamos con un equipo de profesionales que te asesoran para que puedas disfrutar de la mejor experiencia.</p>
      
      <Product consoleId={21} />
    </Content>
  );
}

export default PlaystationPage;
