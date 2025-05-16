import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import { fetchAllConsoles } from '../../api/retroAchievements';
import Content from '../../layouts/Content';
import { Link } from 'react-router-dom';

function ConsolePage() {
    const [consoles, setConsoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllConsoles()
            .then(data => {
                setConsoles(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error al cargar consolas:', err);
                setLoading(false);
            });
    }, []);

    return (
        <Content>
            <Container className="mt-4">
            <h2>Tenemos juegos disponibles para estas consolas</h2>
                {loading ? (
                    <div className="d-flex justify-content-center mt-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <Row>
                        {consoles.map((console, index) => {
                            return (
                                <Col key={index} md={4} className="mb-4">
                                    <Card>
                                        <Card.Img 
                                            variant="top" 
                                            src={console.IconURL} 
                                            alt={console.Name} 
                                            style={{ height: '75px', objectFit: 'contain' }}
                                        />
                                        <Card.Body>
                                            <Card.Title>{console.Name}</Card.Title>
                                            <Link to={`/console/${console.ID}`}
                                                  state={{ console }}
                                                  style={{ textDecoration: 'none' }}>Ver juegos de {console.Name}</Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })}
                    </Row>
                )}
            </Container>
        </Content>
    );
}

export default ConsolePage;
