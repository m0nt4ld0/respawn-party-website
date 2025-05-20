import React, { useEffect, useState } from 'react';
import Content from '../../layouts/Content';
import './UserPage.css'

function UserPage({ logueado, setLogueado }) {
  // JSON hardcodeado con los datos del usuario para poder probar la ruta protegida del usuario al loguearse
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

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!logueado) return;

    // En vez de llamar a la API, directamente seteo el JSON hardcodeado.
    setLoading(true);
    setError(null);

    // Simulo una pequeña demora para la "carga"
    setTimeout(() => {
      setUserData(hardcodedUserData);
      setLoading(false);
    }, 500);

    /*
    // Código original comentado por problema CORS al llamar al endpoint de usuario de la API remota
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Variables de entorno con credenciales
        const username = import.meta.env.VITE_RA_USERNAME;
        const password = import.meta.env.VITE_RA_APIKEY;

        const url = `https://retroachievements.org/API/API_GetUserProfile.php?u=${username}`;
        const response = await fetch(url, {
          headers: {
            // Autenticación básica con base64
            Authorization: `Basic ${btoa(username + ':' + password)}`,
          },
        });

        if (!response.ok) throw new Error('Error al obtener datos del usuario');

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    */

  }, [logueado]);

  if (!logueado) {
    return (
      <Content logueado={logueado} setLogueado={setLogueado}>
        <div className="alert alert-danger text-center mt-5" role="alert">
          No tenés permisos para ver esta página.
        </div>
      </Content>
    );
  }

  return (
    <Content logueado={logueado} setLogueado={setLogueado}>
      <div className="user-profile-container">
        {loading && <p>Cargando...</p>}
        {error && <p className="error-message">{error}</p>}
        {userData && (
          <>
            <div className="user-pic-wrapper">
              <img
                src={`https://retroachievements.org${userData.UserPic}`}
                alt={`Avatar de ${userData.User}`}
                className="user-pic"
              />
            </div>

            <table className="user-data-table">
              <tbody>
                <tr>
                  <th>Apodo</th>
                  <td>{userData.User}</td>
                </tr>
                <tr>
                  <th>Cliente desde</th>
                  <td>{new Date(userData.MemberSince).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th>Puntos acumulados</th>
                  <td>{userData.TotalPoints.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Puntos cambiados</th>
                  <td>{userData.TotalTruePoints.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Jugando</th>
                  <td>{userData.RichPresenceMsg}</td>
                </tr>
                <tr>
                  <th>Firma</th>
                  <td>{userData.Motto}</td>
                </tr>
                <tr>
                  <th>Devoluciones</th>
                  <td>{userData.ContribCount}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </Content>
  );
}

export default UserPage;
