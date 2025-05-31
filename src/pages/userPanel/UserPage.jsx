import React from 'react';
import Content from '../../layouts/Content';
import './UserPage.css';
import { useAuth } from '../../contexts/AuthContext';

function UserPage() {
  const { user: currentUser, loadingUser } = useAuth();

  // Mostrar pantalla de carga mientras se obtiene el usuario desde Firebase
  if (loadingUser) {
    return (
      <Content>
        <div className="text-center mt-5">
          <p>Cargando autenticación...</p>
        </div>
      </Content>
    );
  }

  // Si no hay usuario logueado
  if (!currentUser) {
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
      <div className="user-profile-container">
        {/* Datos de Firebase Auth */}
        <div className="user-firebase-info">
          {currentUser.photoURL && (
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
                <td>{currentUser.displayName || "No disponible"}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{currentUser.email}</td>
              </tr>
              <tr>
                <th>UID</th>
                <td>{currentUser.uid}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Content>
  );
}

export default UserPage;
