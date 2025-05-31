import React, { useEffect, useState } from 'react';
import {
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Breadcrumb
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Content from '../../layouts/Content';
import Product from '../shoppingCart/Product';
import { fetchAllConsoles } from '../../api/retroAchievements';
import './GamesPage.css';

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
        {/* Breadcrumb superior */}
        <Breadcrumb className="bg-transparent px-0 mb-4">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Inicio</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/consoles' }}>Consolas</Breadcrumb.Item>
          <Breadcrumb.Item active>Juegos para {consoleData.Name}</Breadcrumb.Item>
        </Breadcrumb>

        <Row className="align-items-center mb-4">
          <Col xs={12} md={3} className="text-center mb-3 mb-md-0">
            <img
              src={consoleData.IconURL}
              alt={consoleData.Name}
              className="img-fluid rounded shadow"
              style={{
                maxHeight: '150px',
                objectFit: 'contain',
                backgroundColor: 'var(--color-ultra-dark)',
                padding: '1rem',
                borderRadius: '20px'
              }}
            />
          </Col>
          <Col xs={6} md={6}>
            <h3 className="text-white mb-3">Juegos para {consoleData.Name}</h3>
          </Col>
        </Row>


        <Product consoleId={consoleData.ID} />
      </Container>
    </Content>
  );
}

export default GamesPage;
