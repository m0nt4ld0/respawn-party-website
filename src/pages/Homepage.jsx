import Content from '../layouts/Content';
import { Carousel } from 'react-bootstrap';
import './Homepage.css';

function HomePage() {
  return (
    <Content>
      <div style={{ position: 'relative' }}>
        <div className="floating-banner d-flex align-items-center">
          <img src="/images/Logo.png" alt="Talento Games Logo" className="logo-img" />
          <div className="banner-text ms-4">
            <h3 className="text-white m-0">La tienda de juegos retro más grande de Argentina</h3>
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
        <h1>Talento Games</h1>
        <p>
          <b>+1000 de aura retro gamer</b> con estos clásicos
        </p>
        <h3 className="mt-5 mb-4">Consolas retro más populares</h3>
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
                    <h5 className="text-white"><a href={`/console/12`}>PlayStation 1</a></h5>
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
                    <h5 className="text-white"><a href={`/console/21`}>PlayStation 2</a></h5>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="custom-card position-relative overflow-hidden">
                  <img
                    src={`/images/cards/playstation-3.jpg`}
                    alt="PlayStation 3"
                    className="img-fluid w-100"
                  />
                  <div className="card-overlay d-flex justify-content-center align-items-center">
                    <h5 className="text-white"><a href={`/console/21`}>PlayStation 3</a></h5>
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
                    <h5 className="text-white"><a href={`/console/12`}>Nintendo 64</a></h5>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="custom-card position-relative overflow-hidden">
                  <img
                    src={`/images/cards/gba.jpg`}
                    alt="PlayStation 2"
                    className="img-fluid w-100"
                  />
                  <div className="card-overlay d-flex justify-content-center align-items-center">
                    <h5 className="text-white"><a href={`/console/21`}>GameBoy Advance</a></h5>
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
                    <h5 className="text-white"><a href={`/console/21`}>Sega MegaDrive</a></h5>
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
                    <h5 className="text-white"><a href={`/console/21`}>Sega DreamCast</a></h5>
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
                    <h5 className="text-white"><a href={`/console/21`}>Nintendo GameCube</a></h5>
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
