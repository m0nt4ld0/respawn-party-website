import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import './Homepage.css';

// Mover datos fuera del componente para evitar recreación en cada render
const CONSOLE_DATA = [
  { src: 'psone.jpg', id: 12, name: 'PlayStation 1' },
  { src: 'ps2.jpg', id: 21, name: 'PlayStation 2' },
  { src: 'Nintendo-DSi.jpg', id: 78, name: 'Nintendo DSi' },
  { src: 'n64.jpg', id: 2, name: 'Nintendo 64' },
  { src: 'gba.jpg', id: 5, name: 'GameBoy Advance' },
  { src: 'megadrive.jpg', id: 1, name: 'Sega MegaDrive' },
  { src: 'dreamcast.jpg', id: 40, name: 'Sega DreamCast' },
  { src: 'gamecube.jpg', id: 16, name: 'Nintendo GameCube' },
];

function HomePage() {
  // Memorizar el renderizado de las cards para evitar recálculos
  const consoleCards = useMemo(() => 
    CONSOLE_DATA.map(({ src, id, name }, index) => (
      <div key={id} className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="custom-card position-relative overflow-hidden">
          <img
            src={`/images/cards/${src}`}
            alt={name}
            className="img-fluid w-100"
            loading={index < 4 ? "eager" : "lazy"} // Solo las primeras 4 con eager loading
            decoding="async"
          />
          <div className="card-overlay d-flex justify-content-center align-items-center">
            <h5 className="text-white">
              <Link to={`/console/${id}`} state={{ consoleName: name }}>
                {name}
              </Link>
            </h5>
          </div>
        </div>
      </div>
    )), 
  []);

  return (
    <>
      <Navbar />
      <div className="position-relative pb-5 pb-md-6 pb-lg-7 z-index-1 fondo">
        <div className="floating-banner d-flex flex-column flex-md-row align-items-center px-3 px-sm-4 py-3">
          <img
            src="/images/Logo.webp"
            alt="Talento Games Logo"
            className="logo-img img-fluid w-50 w-sm-25"
            loading="eager"
            decoding="async"
          />
          <div className="banner-text ms-4">
            <h2 className="text-white fs-12 fs-sm-8 fs-md-6 m-0">
              La tienda de juegos retro <br />
              <b>más grande de Argentina</b>
            </h2>
          </div>
        </div>

        <Carousel controls={true} indicators={true}>
          <Carousel.Item>
            <div className="carousel-image-wrapper clipped-wrapper">
              <img
                className="d-block w-100 carousel-item-img"
                src="/images/carousel/1.webp"
                alt="GTA San Andreas"
                loading="eager"
                decoding="async"
              />
              <div className="carousel-vignette-overlay" />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-image-wrapper">
              <img
                className="d-block w-100 carousel-item-img"
                src="/images/carousel/2.webp"
                alt="Need For Speed Most Wanted"
                loading="lazy"
                decoding="async"
              />
              <div className="carousel-vignette-overlay" />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-image-wrapper">
              <img
                className="d-block w-100 carousel-item-img"
                src="/images/carousel/3.webp"
                alt="Guitar Hero III"
                loading="lazy"
                decoding="async"
              />
              <div className="carousel-vignette-overlay" />
            </div>
          </Carousel.Item>
        </Carousel>        
      </div>

      <div
        className="section-below-carousel text-center px-4 pt-5 pt-md-6 pt-lg-7 pb-5 position-relative z-index-2"
      >
        <h1>Clásicos</h1>
        <p>
          Que te dan <b>+1000 de aura retro gamer</b>
        </p>
        <h3 className="mt-5 mb-4">Sólo para entendidos</h3>

        <div className="row justify-content-center g-4">
          {consoleCards}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default HomePage;