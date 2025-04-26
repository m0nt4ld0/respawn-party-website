import Content from '../layouts/Content';
import Product from './shoppingCart/Product';

function MultigamePage() {
  return (
    <Content>
      <h1>Juegos Arcade (Fichines)</h1>
      <p>Revive la nostalgia gamer con un arcade clásico donde podrás disfrutar de los mejores fichines de todos los tiempos. Con MAME, la plataforma emuladora más famosa, podrás revivir esos momentos épicos frente a las máquinas de los 80s y 90s, jugando a los títulos más emblemáticos que marcaron una era. Desde los juegos de lucha hasta los de aventuras, ¡es el lugar perfecto para transportarte al pasado y revivir la magia de los arcades!</p>
      <Product consoleId={27} />
    </Content>
  );
}

export default MultigamePage;
