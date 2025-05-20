import Navbar from './Navbar';
import Footer from './Footer';

function Content({ children, logueado, setLogueado }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar logueado={logueado} setLogueado={setLogueado} />

      <main
        style={{
          flex: 1,
          marginTop: '4rem',
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Content;
