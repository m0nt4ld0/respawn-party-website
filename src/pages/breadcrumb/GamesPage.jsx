import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Spinner, Breadcrumb } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Content from '../../layouts/Content';
import Product from '../shoppingCart/Product';
import { fetchAllConsoles } from '../../api/retroAchievements';

function GamesPage() {
  const { id } = useParams();
  const [consoleData, setConsoleData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllConsoles().then(data => {
      const selectedConsole = data.find((c) => c.ID.toString() === id);
      setConsoleData(selectedConsole);
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

  if (!consoleData) {
    return <p>Error: No se encontró información de la consola.</p>;
  }

  return (
    <Content>
      <h3>Juegos para {consoleData.Name}</h3>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Inicio</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/consoles' }}>Consolas</Breadcrumb.Item>
        <Breadcrumb.Item active>Juegos para {consoleData.Name}</Breadcrumb.Item>
      </Breadcrumb>
      <img
        src={consoleData.IconURL}
        alt={consoleData.Name}
        style={{ height: '200px', objectFit: 'contain' }}
      />
      <p>
        Contamos con un equipo de profesionales que te asesoran para que puedas disfrutar de la
        mejor experiencia de videojuegos.
      </p>

      <Product consoleId={consoleData.ID} />
    </Content>
  );
}

export default GamesPage;
