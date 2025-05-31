import React, { useEffect, useState } from 'react';
import Content from '../../layouts/Content';
import './UserPage.css';
import { useAuth } from '../../contexts/AuthContext';

function UserPage() {
  const { currentUser } = useAuth(); // Obtenemos el usuario autenticado
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Datos mockeados (pueden convivir con los de Google si querés)
  const hardcodedUserData = {
    User: "MaxMilyin",
    ULID: "00003EMFWR7XB8SDPEHB3K56ZQ",
    UserPic: "/UserPic/MaxMilyin.png",
    MemberSince: "2016-01-02 00:43:04",
    RichPresenceMsg: "Playing ~Hack~ 11th Annual Vanilla Level Design Contest, The",
    LastGameID: 19504,
    ContribCount: 0,
    ContribYield: 0,
    TotalPoints: 399597,
    TotalSoftcorePoints: 0,
    TotalTruePoints: 1599212,
    Permissions: 1,
    Untracked: 0,
    ID: 16446,
    UserWallActive: true,
    Motto: "Join me on Twitch! GameSquadSquad for live RA"
  };

  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);

    // Simulamos que se carga info adicional (como hacías antes)
    setTimeout(() => {
      setUserData(hardcodedUserData);
      setLoading(false);
    }, 500);
  }, [currentUser]);

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
        {loading && <p>Cargando...</p>}

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
