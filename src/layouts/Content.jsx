import Navbar from './Navbar';
import Footer from './Footer';

function Content({ children }) {
  return (
    <div>
      <Navbar />
      <main style={{ marginTop: '4rem' }}>{children}</main>
      <Footer />
    </div>
  );
}

export default Content;
