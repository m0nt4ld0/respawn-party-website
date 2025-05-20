import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Spinner, Button } from 'react-bootstrap';
import { ShoppingCartContext } from './ShoppingCart';
import './ProductDetail.css'

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
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!game) {
    return <div>No se encontró el juego.</div>;
  }

  return (
    <Container className="mt-5">
      <h2>{game.Title}</h2>
      <img
        src={`https://retroachievements.org${game.ImageBoxArt}`}
        alt={game.Title}
        className="mb-4"
        style={{ maxHeight: '300px' }}
      />
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>Consola</th>
            <td>{game.ConsoleName}</td>
          </tr>
          <tr>
            <th>Lanzamiento</th>
            <td>{game.Released}</td>
          </tr>
          <tr>
            <th>Jugadores</th>
            <td>{game.NumDistinctPlayers}</td>
          </tr>
          <tr>
            <th>Logros</th>
            <td>{game.NumAchievements}</td>
          </tr>
          <tr>
            <th>Desarrollador</th>
            <td>{game.Developer || 'Desconocido'}</td>
          </tr>
          <tr>
            <th>Género</th>
            <td>{game.Genre || 'N/A'}</td>
          </tr>
        </tbody>
      </Table>

      <div className="d-flex justify-content-end">
        <Button className="product-button" variant="success" onClick={() => addToCart(game)}>
          Agregar al carrito
        </Button>
      </div>
    </Container>
  );
}

export default ProductDetail;
