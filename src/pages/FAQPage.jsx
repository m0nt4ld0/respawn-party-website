import Content from '../layouts/Content';
import DropdownItem from '../components/help/DropdownItem';
import { Accordion } from 'react-bootstrap';

function FAQPage() {
  return (
    <Content>
      <div className="container-fluid pt-5">
        <h1>Preguntas Frecuentes</h1>
        <Accordion>
          <DropdownItem
            eventKey="0"
            title="¿Qué es Talento Games?"
            content="Somos una empresa dedicada a la venta de videojuyegos y consolas retro. Te asesoramos para que puedas disfrutar de la mejor experiencia de entretenimiento."
          />
          <DropdownItem
            eventKey="1"
            title="¿Cómo puedo adquirir una consola?"
            content={
              <>
                Acercándote a nuestros locales o a través de nuestro sitio web.
              </>
            }
          />
          <DropdownItem
            eventKey="2"
            title="¿Con qué juegos cuentan?"
            content="Tenés nuestro catálogo de juegos en formato físico en esta web."
          />
          <DropdownItem
            eventKey="3"
            title="¿Cómo puedo abonar?"
            content="Podés abonar en efectivo, tarjeta de débito o crédito, o a través de Mercado Pago."
          />
          <DropdownItem
            eventKey="4"
            title="Compré una Play 5 ¿Cómo juego en la Play 5?"
            content={
              <>
                Podés ver un tutorial paso a paso en este video de YouTube:{' '}
                <a href="https://www.youtube.com/watch?v=jc-KIyh3nuI&list=PL9_L8_WdAQ3xo_OdEkOc6moUPVZm5KV6o&index=2" target="_blank" rel="noopener noreferrer">
                  Ver video
                </a>
              </>
            }
          />
          <DropdownItem
            eventKey="5"
            title="Compré una Play 5 ¿Cómo conecto la Play 5 a mi red Wi-Fi?"
            content={
              <>
                Podés ver un tutorial paso a paso en este video de YouTube:{' '}
                <a href="https://www.youtube.com/watch?v=5JN5JN5JN5J" target="_blank" rel="noopener noreferrer">
                  Ver video
                </a>
              </>
            }
          />
          <DropdownItem
            eventKey="6"
            title="Compré una Play 5 ¿Cómo conecto más de un joystick a la Play 5?"
            content={
              <>
                Podés ver un tutorial paso a paso en este video de YouTube:{' '}
                <a href="https://www.youtube.com/watch?v=Vu24ZXcM1UI&list=PL9_L8_WdAQ3xo_OdEkOc6moUPVZm5KV6o" target="_blank" rel="noopener noreferrer">
                  Ver video
                </a>
              </>
            }
          />
        </Accordion>
      </div>
    </Content>
    
  );
}

export default FAQPage;
