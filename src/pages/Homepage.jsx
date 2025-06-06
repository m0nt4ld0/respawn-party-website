import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbar from '../layouts/Navbar';
import Footer from '../layouts/Footer';
import './Homepage.css';

function HomePage() {
  return (
    <>
      <Navbar />
      <div className="position-relative pb-5 pb-md-6 pb-lg-7 z-index-1 fondo">
        <div className="floating-banner d-flex flex-column flex-md-row align-items-center px-3 px-sm-4 py-3">
          <img
            src="/images/Logo.webp"
            alt="Talento Games Logo"
            className="logo-img img-fluid w-50 w-sm-25"
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
          {[
            { src: 'psone.webp', id: 12, name: 'PlayStation 1' },
            { src: 'ps2.webp', id: 21, name: 'PlayStation 2' },
            { src: 'Nintendo-DSi.webp', id: 78, name: 'Nintendo DSi' },
            { src: 'n64.webp', id: 2, name: 'Nintendo 64' },
            { src: 'gba.webp', id: 5, name: 'GameBoy Advance' },
            { src: 'megadrive.webp', id: 1, name: 'Sega MegaDrive' },
            { src: 'dreamcast.webp', id: 40, name: 'Sega DreamCast' },
            { src: 'gamecube.webp', id: 16, name: 'Nintendo GameCube' },
          ].map(({ src, id, name }) => (
            <div key={id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="custom-card position-relative overflow-hidden">
                <img
                  src={`/images/cards/${src}`}
                  alt={name}
                  className="img-fluid w-100"
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
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default HomePage;
