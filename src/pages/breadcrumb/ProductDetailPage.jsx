import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import Content from '../../layouts/Content';
import ProductDetail from '../shoppingCart/ProductDetail';

function ProductDetailPage() {
  const { state } = useLocation();
  const { id } = useParams();

  const consoleName = state?.consoleName || 'Consola desconocida';

  return (
    <Content>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Inicio</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/consoles' }}>Consolas</Breadcrumb.Item>
        <Breadcrumb.Item active>Detalle del juego #{id} ({consoleName})</Breadcrumb.Item>
      </Breadcrumb>

      <ProductDetail /> {/* El botón está dentro de este componente */}
    </Content>
  );
}

export default ProductDetailPage;
