import Content from '../layouts/Content';
import DropdownItem from '../components/help/DropdownItem';
import { Accordion } from 'react-bootstrap';

function FAQPage() {
  return (
    <Content>
      <h1>Preguntas Frecuentes</h1>
      <Accordion defaultActiveKey="0">
        <DropdownItem
          eventKey="0"
          title="¿Qué es Respawn Party?"
          content="Respawn Party es un emprendimiento dedicado al alquiler de consolas de videojuegos y proyectores. Te asesoramos para que puedas disfrutar de la mejor experiencia de videojuegos."
        />
        <DropdownItem
          eventKey="1"
          title="¿Cómo puedo alquilar una consola o proyector?"
          content={
            <>
              Para reservar, completá el siguiente formulario: 
              <a href="https://forms.gle/PwXzzAsGVJkFTXNh9" target="_blank" rel="noopener noreferrer">
                Formulario de alquiler
              </a>
            </>
          }
        />
        <DropdownItem
          eventKey="2"
          title="¿Con qué juegos cuenta la consola?"
          content="La PlayStation 5 cuenta con el catálogo de PlayStation Deluxe y otros juegos en formato físico y digital. Consultanos por los juegos que querés, nosotros los descargamos y lo dejamos listo para que juegues."
        />
        <DropdownItem
          eventKey="3"
          title="¿Cómo puedo abonar?"
          content="Podés abonar en efectivo o a través de Mercado Pago. El pago se realiza al momento de recibir la consola."
        />
        <DropdownItem
          eventKey="4"
          title="¿Cómo juego en la Play 5"
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
          title="¿Cómo conecto la Play 5 a mi red Wi-Fi?"
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
          title="¿Cómo conecto más de un joystick a la Play 5?"
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
    </Content>
  );
}

export default FAQPage;
