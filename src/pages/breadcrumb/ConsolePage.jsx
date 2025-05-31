import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Spinner, Breadcrumb, Pagination } from 'react-bootstrap';
import { fetchAllConsoles } from '../../api/retroAchievements';
import Content from '../../layouts/Content';
import { Link } from 'react-router-dom';

function ConsolePage() {
    const [consoles, setConsoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const consolesPerPage = 9;

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

    const indexOfLastConsole = currentPage * consolesPerPage;
    const indexOfFirstConsole = indexOfLastConsole - consolesPerPage;
    const currentConsoles = consoles.slice(indexOfFirstConsole, indexOfLastConsole);
    const totalPages = Math.ceil(consoles.length / consolesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Content>
            <div className="angled-background" />
            <Container className="py-4">
                <div className="header-hero">
                    <h1>Catálogo por consola</h1>
                </div>
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item active>Consolas</Breadcrumb.Item>
                </Breadcrumb>
                    
                    <div className="d-flex justify-content-center mt-4">
                        <Pagination className="custom-pagination">
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
                {loading ? (
                    <div className="d-flex justify-content-center mt-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <>
                        <Row>
                            {currentConsoles.map((console, index) => (
                                <Col key={index} md={6} lg={4} className="mb-4">
                                <Card className="console-card h-100 shadow-sm border-0">
                                    <div className="text-center pt-4 px-4">
                                    <Card.Img
                                        variant="top"
                                        src={console.IconURL}
                                        alt={console.Name}
                                        className="console-img mx-auto"
                                    />
                                    </div>
                                    <Card.Body className="console-card-body d-flex flex-column justify-content-between">
                                    <div>
                                        <Card.Title className="console-title text-center mb-3">{console.Name}</Card.Title>
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
                            ))}
                        </Row>


                        <div className="d-flex justify-content-center mt-4">
                            <Pagination className="custom-pagination">
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
        </Content>
    );
}

export default ConsolePage;
