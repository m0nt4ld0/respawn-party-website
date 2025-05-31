import React, { useEffect, useState } from 'react';
import {
  Container,
  Spinner,
  Breadcrumb
} from 'react-bootstrap';
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
      <div className="angled-background" />
      <Container className="py-4">
        
        <div className="header-hero">
          <img
            src={consoleData.IconURL}
            alt={consoleData.Name}
          />
          <h1>Juegos para {consoleData.Name}</h1>
        </div>
        <Breadcrumb className="bg-transparent px-0 mb-4">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Inicio</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/consoles' }}>Consolas</Breadcrumb.Item>
          <Breadcrumb.Item active>Juegos para {consoleData.Name}</Breadcrumb.Item>
        </Breadcrumb>

        <Product consoleId={consoleData.ID} />
      </Container>
    </Content>
  );
}

export default GamesPage;
