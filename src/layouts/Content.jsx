import Navbar from './Navbar';
import Footer from './Footer';
import {
  Container,
  Breadcrumb
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Content.css';

function Content({ title, breadcrumbItems, children }) {
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
        className="mt-5 pb-5"
      >
        <div className="angled-background" />
        <Container className="py-4">
          <div className="header-hero">
            <h1>{title}</h1>
          </div>

          <Breadcrumb className="bg-transparent px-0 mb-4">
            {breadcrumbItems.map(({ label, to, active }, idx) => (
              active ? (
                <Breadcrumb.Item key={idx} active>{label}</Breadcrumb.Item>
              ) : (
                <Breadcrumb.Item
                  key={idx}
                  linkAs={Link}
                  linkProps={{ to }}
                >
                  {label}
                </Breadcrumb.Item>
              )
            ))}
          </Breadcrumb>
          
          {children}
        </Container>
        
      </main>
      <Footer />
    </div>
  );
}

export default Content;
