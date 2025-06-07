import React, { useState, useContext, useMemo } from 'react';
import {
  Card,
  Row,
  Col,
  Spinner,
  Pagination
} from 'react-bootstrap';
import { ConsoleContext } from '../../contexts/ConsoleContext';
import Content from '../../layouts/Content';
import { Link } from 'react-router-dom';

// Componente optimizado para cada consola individual
const ConsoleCard = React.memo(({ console, index }) => {
  return (
    <Col key={index} md={6} lg={4} className="mb-4">
      <Card className="console-card h-100 shadow-sm border-0">
        <div className="text-center pt-4 px-4">
          <Card.Img
            variant="top"
            src={console.IconURL}
            alt={console.Name}
            className="console-img mx-auto"
            loading="lazy"
          />
        </div>
        <Card.Body className="console-card-body d-flex flex-column justify-content-between">
          <div>
            <Card.Title className="console-title text-center mb-3">
              {console.Name}
            </Card.Title>
          </div>
          <div className="text-center mt-auto">
            <Link
              to={`/console/${console.ID}`}
              state={{ console }}
              className="btn btn-primary rounded-pill px-4"
            >
              Ver juegos
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
});

// Componente optimizado para la paginación
const PaginationComponent = React.memo(({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => (
  <div className="d-flex justify-content-center mt-4">
    <Pagination className="custom-pagination">
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  </div>
));

const ConsolePage = React.memo(() => {
  const { consoles, loadingConsoles } = useContext(ConsoleContext);
  const [currentPage, setCurrentPage] = useState(1);
  const consolesPerPage = 9;

  // Memoizar los cálculos de paginación para evitar recálculos innecesarios
  const paginatedData = useMemo(() => {
    const indexOfLastConsole = currentPage * consolesPerPage;
    const indexOfFirstConsole = indexOfLastConsole - consolesPerPage;
    return {
      currentConsoles: consoles.slice(indexOfFirstConsole, indexOfLastConsole),
      totalPages: Math.ceil(consoles.length / consolesPerPage)
    };
  }, [consoles, currentPage, consolesPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Content
      title="Catálogo por consola"
      breadcrumbItems={[
        { label: 'Inicio', to: '/' },
        { label: 'Consolas', active: true }
      ]}
      isLoading={loadingConsoles}
      skeletonType="console"
      seoTitle="Consolas de Videojuegos"
      seoDescription="Explora nuestro catálogo de consolas retro y encuentra tus juegos favoritos"
      seoKeywords="consolas retro, videojuegos clásicos, Nintendo, PlayStation, Xbox, retro gaming"
    >
      <PaginationComponent
        currentPage={currentPage}
        totalPages={paginatedData.totalPages}
        onPageChange={handlePageChange}
      />

      <Row>
        {paginatedData.currentConsoles.map((console, index) => (
          <ConsoleCard
            key={console.ID}
            console={console}
            index={index}
          />
        ))}
      </Row>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={paginatedData.totalPages}
        onPageChange={handlePageChange}
      />
    </Content>
  );
});

export default ConsolePage;