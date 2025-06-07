import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
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

  const iconFileName = consoleData.IconURL
  ? new URL(consoleData.IconURL).pathname.split('/').pop()
  : 'default-console.png';


  return (
    <Content
      title={`Juegos para ${consoleData.Name}`}
      breadcrumbItems={[
        { label: 'Inicio', to: '/' },
        { label: 'Consolas', to: '/consoles' },
        { label: `Juegos para ${consoleData.Name}`, active: true }
      ]}
    >
      <div className="text-center mb-4">
        <img
          src={`/images/icons/consoles/${iconFileName}`}
          alt={consoleData.Name}
          style={{ maxHeight: '100px' }}
        />
      </div>

      <Product consoleId={consoleData.ID} />
    </Content>
  );
}

export default GamesPage;
