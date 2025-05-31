import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, Container, Row, Col, Form, Spinner, Pagination } from 'react-bootstrap';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import { fetchGameListByConsoleId } from '../../api/retroAchievements';
import { Link } from 'react-router-dom';
import './Product.css';


function Product({ consoleId }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 18;

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
                                <Col key={index} md={4} className="mb-4">
                                    <Card className="product-card">
                                        <Card.Img
                                            variant="top"
                                            src={"https://retroachievements.org/" + product.ImageIcon}
                                            alt={product.Title}
                                            className="product-img"
                                        />
                                        <Card.Body>
                                            <Card.Title className="product-card-title">
                                                <Link to={`/product/${product.ID}`} 
                                                      state={{ consoleName: product.ConsoleName }}
                                                      className="product-link">
                                                    {product.Title}
                                                </Link>
                                            </Card.Title>
                                            <Card.Text>
                                                {product.ConsoleName}
                                                <br />
                                                <span className="product-card-price">${product.ID}</span>
                                            </Card.Text>
                                            <div className="d-flex align-items-center">
                                                <Button variant="primary" onClick={() => addToCart(product)}>
                                                    +
                                                </Button>
                                                <Form.Control
                                                    type="text"
                                                    value={cantidadEnCarrito}
                                                    readOnly
                                                    className="mx-2 text-center"
                                                    style={{ width: '60px' }}
                                                />
                                                <Button variant="danger" onClick={() => removeFromCart(product)}>
                                                    -
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>

                    {/* Pagination */}
                    <div className="d-flex justify-content-center">
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
