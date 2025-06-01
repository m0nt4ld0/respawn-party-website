import Navbar from './Navbar';
import Footer from './Footer';
import {
  Container,
  Breadcrumb
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Content.css';

function Content({ title, breadcrumbItems = [], children }) {
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
        className="mt-5 pb-5"
      >
        <div className="angled-background" />

        <Container className="py-4">
          {title && (
            <div className="header-hero">
              <h1>{title}</h1>
            </div>
          )}

          {breadcrumbItems.length > 0 && (
            <Breadcrumb className="bg-transparent px-0 mb-4">
              {breadcrumbItems.map(({ label, to, active }, idx) =>
                active ? (
                  <Breadcrumb.Item key={idx} active>
                    {label}
                  </Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item
                    key={idx}
                    linkAs={Link}
                    linkProps={{ to }}
                  >
                    {label}
                  </Breadcrumb.Item>
                )
              )}
            </Breadcrumb>
          )}

          <motion.div
            className="animated-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default Content;
