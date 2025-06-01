import React, { useState } from 'react';
import Content from '../../layouts/Content';
import { Button, 
         Table, 
         Container,
         Breadcrumb,
         Image } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function UserPage() {
  const { user: currentUser, loadingUser, logout } = useAuth();
  const [justLoggedOut, setJustLoggedOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setJustLoggedOut(true);
      navigate('/', { state: { message: 'Desconexión exitosa' } });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (loadingUser) {
    return (
      <Content>
        <div className="text-center mt-5">
          <p>Cargando autenticación...</p>
        </div>
      </Content>
    );
  }

  if (!currentUser && !justLoggedOut) {
    return (
      <Content>
        <div className="alert alert-danger text-center mt-5" role="alert">
          No tenés permisos para ver esta página.
        </div>
      </Content>
    );
  }

  return (
    <Content>
      <div className="angled-background" />
      <Container className="py-4">
        <div className="header-hero">
          <h1>Hola, {currentUser?.displayName || currentUser?.email}</h1>
        </div>

        <Breadcrumb className="bg-transparent px-0 mb-4">
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Inicio</Breadcrumb.Item>
            <Breadcrumb.Item active>Mi perfil</Breadcrumb.Item>
          </Breadcrumb>

      <div className="container" style={{ maxWidth: '600px'}}>
        <div className="bg-dark text-light p-4 rounded shadow text-center">
          {currentUser?.photoURL && (
            <div className="mb-3">
              <Image
                src={currentUser.photoURL}
                alt="Foto de perfil"
                roundedCircle
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  border: '3px solid var(--color)',
                }}
              />
            </div>
          )}
          <Table bordered responsive className="table-dark table-hover mt-3 text-start">
            <tbody>
              <tr>
                <th className="w-50 text-light">Nombre</th>
                <td>{currentUser?.displayName || "No disponible"}</td>
              </tr>
              <tr>
                <th className="text-light">Email</th>
                <td>{currentUser?.email}</td>
              </tr>
              <tr>
                <th className="text-light">UID</th>
                <td>{currentUser?.uid}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div className="text-center mt-3 mb-5">
          <Button variant="danger" size="sm" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      </div>
      </Container>
    </Content>
  );
}

export default UserPage;
