import { Container, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Content from '../layouts/Content';

function NotFoundPage(){
    return (
        <Content>
            <div className="angled-background" />
            <Container className="mt-4">
                <div className="header-hero">
                    <h1>Ups...</h1>
                </div>
                <Breadcrumb className="bg-transparent px-0 mb-4">
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item active>Game Over</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <img
                        src="/images/game-over.gif"
                        alt="No encontrado"
                        className="mb-4"
                        style={{ width: '250px', height: 'auto', opacity: 0.8 }}
                    />
                    <h1 className="text-info">404 - No encontrado</h1>
                    <p className="text-info">La página que estás buscando no existe.</p>
                    <Link to="/" className="btn btn-outline-primary mt-4">
                        Volver al inicio
                    </Link>
                </div>
            </Container>
        </Content>
    );
}

export default NotFoundPage;
