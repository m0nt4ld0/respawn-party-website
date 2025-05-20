import Content from '../layouts/Content';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Homepage.css';

function HomePage() {
  return (
    <Content>
      <div style={{ position: 'relative' }}>
        <div className="floating-banner d-flex align-items-center">
          <img src="/images/Logo.png" alt="Talento Games Logo" className="logo-img" />
          <div className="banner-text ms-4">
            <h3 className="text-white m-0">La tienda de juegos retro <br/><b>más grande de Argentina</b></h3>
          </div>
        </div>

        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-item"
              src="/images/carousel/1.webp"
              alt="GTA San Andreas"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-item"
              src="/images/carousel/2.jpg"
              alt="Need For Speed Most Wanted"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-item"
              src="/images/carousel/3.jpg"
              alt="Guitar Hero III"
            />
          </Carousel.Item>
        </Carousel>

        <div className="clip-bottom">
        </div>
      
      </div>
      <div className="container-fluid section-below-carousel text-center">
        <h1>Clásicos</h1>
        <p>
          Que te dan <b>+1000 de aura retro gamer</b>
        </p>
        <h3 className="mt-5 mb-4">Sólo para entendidos</h3>
        <p>
            <div className="row justify-content-center g-4">
              
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="custom-card position-relative overflow-hidden">
                  <img
                    src={`/images/cards/psone.jpg`}
                    alt="PlayStation 1"
                    className="img-fluid w-100"
                  />
                  <div className="card-overlay d-flex justify-content-center align-items-center">
                    <h5 className="text-white">
                      <Link to={`/console/12`} state={{ consoleName: 'PlayStation 1' }}>
                        PlayStation 1
                      </Link>
                    </h5>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="custom-card position-relative overflow-hidden">
                  <img
                    src={`/images/cards/ps2.jpg`}
                    alt="PlayStation 2"
                    className="img-fluid w-100"
                  />
                  <div className="card-overlay d-flex justify-content-center align-items-center">
                    <h5 className="text-white">
                      <Link to={`/console/21`} state={{ consoleName: 'PlayStation 2' }}>
                        PlayStation 2
                      </Link>
                    </h5>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="custom-card position-relative overflow-hidden">
                  <img
                    src={`/images/cards/Nintendo-DSi.jpg`}
                    alt="Nintendo DSi"
                    className="img-fluid w-100"
                  />
                  <div className="card-overlay d-flex justify-content-center align-items-center">
                    <h5 className="text-white">
                      <Link to={`/console/78`} state={{ consoleName: 'Nintendo DSi' }}>
                        Nintendo DSi
                      </Link>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="custom-card position-relative overflow-hidden">
                  <img
                    src={`/images/cards/n64.jpg`}
                    alt="Nintendo 64"
                    className="img-fluid w-100"
                  />
                  <div className="card-overlay d-flex justify-content-center align-items-center">
                    <h5 className="text-white">
                      <Link to={`/console/2`} state={{ consoleName: 'Nintendo 64' }}>
                        Nintendo 64
                      </Link>
                    </h5>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="custom-card position-relative overflow-hidden">
                  <img
                    src={`/images/cards/gba.jpg`}
                    alt="GameBoy Advance"
                    className="img-fluid w-100"
                  />
                  <div className="card-overlay d-flex justify-content-center align-items-center">
                    <h5 className="text-white">
                      <Link to={`/console/5`} state={{ consoleName: 'GameBoy Advance' }}>
                        GameBoy Advance
                      </Link>
                    </h5>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="custom-card position-relative overflow-hidden">
                  <img
                    src={`/images/cards/megadrive.jpg`}
                    alt="Sega MegaDrive"
                    className="img-fluid w-100"
                  />
                  <div className="card-overlay d-flex justify-content-center align-items-center">
                    <h5 className="text-white">
                      <Link to={`/console/1`} state={{ consoleName: 'Sega MegaDrive' }}>
                        Sega MegaDrive
                      </Link>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="custom-card position-relative overflow-hidden">
                  <img
                    src={`/images/cards/dreamcast.jpg`}
                    alt="Sega DreamCast"
                    className="img-fluid w-100"
                  />
                  <div className="card-overlay d-flex justify-content-center align-items-center">
                    <h5 className="text-white">
                      <Link to={`/console/40`} state={{ consoleName: 'Sega DreamCast' }}>
                        Sega DreamCast
                      </Link>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="custom-card position-relative overflow-hidden">
                  <img
                    src={`/images/cards/gamecube.jpg`}
                    alt="Nintendo GameCube"
                    className="img-fluid w-100"
                  />
                  <div className="card-overlay d-flex justify-content-center align-items-center">
                      <h5 className="text-white">
                        <Link to={`/console/16`} state={{ consoleName: 'Nintendo GameCube' }}>
                          Nintendo GameCube
                        </Link>
                      </h5>
                    </div>
                </div>
              </div>
              
          </div>

        </p>
      </div>
      
      
    </Content>
  );
}

export default HomePage;
