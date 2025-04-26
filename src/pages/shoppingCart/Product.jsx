import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import { ShoppingCartContext } from './ShoppingCart';
import { fetchGameListByConsoleId } from '../../api/retroAchievements';

function Product({ consoleId }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { cart, addToCart, removeFromCart } = useContext(ShoppingCartContext);

    useEffect(() => {
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

    return (
        <Container className="mt-4">
            {loading ? (
                <div className="d-flex justify-content-center mt-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <Row>
                    {products.map((product, index) => {
                        const cantidadEnCarrito = cart.find(item => item.producto.ID === product.ID)?.cantidad || 0;
                        return (
                            <Col key={index} md={4} className="mb-4">
                                <Card>
                                    <Card.Img 
                                        variant="top" 
                                        src={"https://retroachievements.org/" + product.ImageIcon} 
                                        alt={product.Title} 
                                        style={{ height: '200px', objectFit: 'contain' }}
                                    />
                                    <Card.Body>
                                        <Card.Title>{product.Title}</Card.Title>
                                        <Card.Text>
                                            {product.ConsoleName}
                                            <br />
                                            <strong>${Math.floor(Math.random() * 60) + 10}</strong>
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
            )}
        </Container>
    );
}

export default Product;
