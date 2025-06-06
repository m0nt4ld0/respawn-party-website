import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { Row, Col, Card, Button, Form, Spinner, InputGroup } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { ShoppingCartContext } from '../contexts/ShoppingCartContext';
import { fetchGameListByConsoleId } from '../api/retroAchievements';
import Content from '../layouts/Content';
import { ConsoleContext } from '../contexts/ConsoleContext';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResultsPage() {
  const query = useQuery().get('query')?.toLowerCase() || '';
  const selectedConsoleId = useQuery().get('console') || '';
  const navigate = useNavigate();

  const { consoles, loadingConsoles } = useContext(ConsoleContext);
  const { cart, addToCart, removeFromCart } = useContext(ShoppingCartContext);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedConsole, setSelectedConsole] = useState(selectedConsoleId);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  useEffect(() => {
    if (!query || !selectedConsole || loadingConsoles) {
      setFiltered([]);
      return;
    }

    setLoading(true);

    fetchGameListByConsoleId(selectedConsole)
      .then(data => {
        const games = Object.values(data || {});
        const matches = games.filter(game =>
          game.Title?.toLowerCase().includes(query)
        );
        setFiltered(matches);
        setCurrentPage(1);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al buscar juegos:', err);
        setFiltered([]);
        setLoading(false);
      });
  }, [query, selectedConsole, loadingConsoles]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery && selectedConsole) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}&console=${selectedConsole}`);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filtered.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filtered.length / productsPerPage);

  return (
    <Content
      title="Resultados de búsqueda"
      seoTitle="Inicio"
      seoDescription="Descubrí los mejores juegos y consolas en alquiler en Talento Games."
      seoKeywords="venta consolas, videojuegos, Talento Games"
      seoUrl="https://talento-games.vercel.app/"
      breadcrumbItems={[
        { label: 'Inicio', to: '/', active: false },
        { label: 'Resultados', active: true },
      ]}>
      
      <Form onSubmit={handleSearch} className="mb-4">
        <Row className="g-2 align-items-center">
          <Col xs={12} md={3}>
            <DropdownButton
              id="dropdown-console"
              title={
                selectedConsole
                  ? <>
                      <img
                        src={consoles.find(c => c.ID.toString() === selectedConsole)?.IconURL}
                        alt=""
                        style={{ height: '20px', marginRight: '8px' }}
                      />
                      {consoles.find(c => c.ID.toString() === selectedConsole)?.Name}
                    </>
                  : 'Selecciona una consola'
              }
              onSelect={(eventKey) => setSelectedConsole(eventKey)}
              variant="outline-secondary"
              className="w-100"
            >
              {consoles.map((c) => (
                <Dropdown.Item key={c.ID} eventKey={c.ID}>
                  <img
                    src={c.IconURL}
                    alt={c.Name}
                    style={{ height: '20px', marginRight: '8px' }}
                  />
                  {c.Name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>

          <Col xs={12} md={6}>
            <InputGroup>
              <Form.Control
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar juego..."
              />
              <Button type="submit" variant="primary">Buscar</Button>
            </InputGroup>
          </Col>
        </Row>
      </Form>


      {loading || loadingConsoles ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : filtered.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <>
          <Row>
            {currentProducts.map(product => {
              const cantidadEnCarrito = cart.find(item => item.producto.ID === product.ID)?.cantidad || 0;
              return (
                <Col key={product.ID} md={3} className="mb-4">
                  <Card className="product-card h-100 d-flex flex-column">
                    <Card.Img
                      variant="top"
                      src={"https://retroachievements.org/" + product.ImageIcon}
                      alt={product.Title}
                      className="product-img"
                    />
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <div>
                        <Card.Title className="product-card-title mb-2">
                          <Link
                            to={`/product/${product.ID}`}
                            state={{ consoleName: product.ConsoleName }}
                            className="product-link"
                          >
                            {product.Title}
                          </Link>
                        </Card.Title>
                        <Card.Text className="text-muted small">
                          {product.ConsoleName}
                        </Card.Text>
                      </div>
                      <div className="mt-3">
                        <span className="product-card-price h5 d-block">${product.ID}</span>
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-transparent border-0">
                      <div className="d-flex justify-content-between align-items-center">
                        <Button variant="primary" size="sm" onClick={() => addToCart(product)}>
                          <FaPlus />
                        </Button>
                        <Form.Control
                          type="text"
                          value={cantidadEnCarrito}
                          readOnly
                          className="text-center mx-2"
                          style={{ width: '50px' }}
                          size="sm"
                        />
                        <Button variant="danger" size="sm" onClick={() => removeFromCart(product)}>
                          <FaMinus />
                        </Button>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
          </Row>

          <div className="pagination-container d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Anterior</button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index + 1} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Siguiente</button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </Content>
  );
}

export default SearchResultsPage;
