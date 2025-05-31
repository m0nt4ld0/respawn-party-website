import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Card, Row, Col, Spinner, Button } from 'react-bootstrap';
import { ShoppingCartContext } from './ShoppingCart';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(ShoppingCartContext);

  useEffect(() => {
    const username = import.meta.env.VITE_RA_USERNAME;
    const apiKey = import.meta.env.VITE_RA_APIKEY;

    fetch(`https://retroachievements.org/API/API_GetGameExtended.php?z=${username}&y=${apiKey}&i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setGame(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar detalles del juego:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '60vh' }}>
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Cargando detalles del juego...</p>
      </div>
    );
  }

  if (!game) {
    return <div className="text-center mt-5">No se encontró el juego.</div>;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-lg border-0 rounded-4 p-4">
            <Row className="align-items-center">
              <Col md={5} className="text-center mb-4 mb-md-0">
                <img
                  src={`https://retroachievements.org${game.ImageBoxArt}`}
                  alt={game.Title}
                  className="img-fluid rounded-3 game-img"
                />
              </Col>
              <Col md={7}>
                <Card.Body>
                  <Card.Title className="fs-2 fw-bold mb-3">{game.Title}</Card.Title>
                  <Card.Text className="mb-4">
                    <strong>Consola:</strong>{' '}
                    <Link to={`/console/${game.ConsoleID}`} className="text-decoration-none">
                      {game.ConsoleName}
                    </Link>
                    <br />
                    <strong>Lanzamiento:</strong> {game.Released} <br />
                    <strong>Jugadores:</strong> {game.NumDistinctPlayers} <br />
                    <strong>Desarrollador:</strong> {game.Developer || 'Desconocido'} <br />
                    <strong>Género:</strong> {game.Genre || 'N/A'} <br />
                    <strong>Precio:</strong> ${game.ID || 'N/A'}
                  </Card.Text>
                  <Button variant="primary" onClick={() => addToCart(game)}>
                    Agregar al carrito
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
