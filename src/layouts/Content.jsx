import Navbar from './Navbar';
import Footer from './Footer';
import './Content.css';

function Content({children}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar/>

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
