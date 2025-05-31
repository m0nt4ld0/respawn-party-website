import React, { useState } from 'react';
import Content from '../../layouts/Content';
import './UserPage.css';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function UserPage() {
  const { user: currentUser, loadingUser, logout } = useAuth();
  const [justLoggedOut, setJustLoggedOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setJustLoggedOut(true); // marcar que fue un cierre voluntario
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
      <div className="user-profile-container mt-5">
        <div className="user-firebase-info">
          {currentUser?.photoURL && (
            <div className="user-pic-wrapper">
              <img
                src={currentUser.photoURL}
                alt="Foto de perfil"
                className="user-pic"
              />
            </div>
          )}
          <table className="user-data-table">
            <tbody>
              <tr>
                <th>Nombre</th>
                <td>{currentUser?.displayName || "No disponible"}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{currentUser?.email}</td>
              </tr>
              <tr>
                <th>UID</th>
                <td>{currentUser?.uid}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center mt-3 mb-5">
        <Button variant="danger" size="sm" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>
    </Content>
  );
}

export default UserPage;
