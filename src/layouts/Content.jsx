import Navbar from './Navbar';
import Footer from './Footer';

function Content({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar />

      <main
        style={{
          flex: 1,
          marginTop: '4rem',
        }}
      >
        {/* Elimina container/container-fluid */}
        {children}
      </main>

      {/* Footer fuera del contenedor */}
      <Footer />
    </div>
  );
}

export default Content;
