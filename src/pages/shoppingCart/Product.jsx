import React, { useEffect, useState, useContext } from 'react';
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Form,
  Spinner,
  Pagination
} from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import { fetchGameListByConsoleId } from '../../api/retroAchievements';
import { Link } from 'react-router-dom';
import './Product.css';

function Product({ consoleId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const { cart, addToCart, removeFromCart } = useContext(ShoppingCartContext);

  useEffect(() => {
    setLoading(true);
    fetchGameListByConsoleId(consoleId)
      .then(data => {
        const gamesArray = Object.values(data);
        setProducts(gamesArray);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar productos:', err);
        setLoading(false);
      });
  }, [consoleId]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-4">
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Row>
            {currentProducts.map((product, index) => {
                const cantidadEnCarrito = cart.find(item => item.producto.ID === product.ID)?.cantidad || 0;
                return (
                <Col key={index} md={3} className="mb-4">
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
          
          <div className="pagination-container">
            <Pagination>
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </div>
        </>
      )}
    </Container>
  );
}

export default Product;
