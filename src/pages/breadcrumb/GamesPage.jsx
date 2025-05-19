import React from 'react';
import { Card, Container, Row, Col, Spinner, Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import Content from '../../layouts/Content';
import Product from '../shoppingCart/Product';

function GamesPage() {
  const { state } = useLocation();
  const consoleData = state?.console;

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
