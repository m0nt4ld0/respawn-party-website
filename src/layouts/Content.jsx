import Navbar from './Navbar';
import Footer from './Footer';
import {
  Container,
  Breadcrumb,
  Row,
  Col,
  Card
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import seoImage from '/images/Logo.webp';
import './Content.css';

const ConsoleSkeleton = () => (
  <Row>
    {[...Array(9)].map((_, i) => (
      <Col key={i} md={6} lg={4} className="mb-4">
        <Card className="console-card h-100 shadow-sm border-0">
          <div className="text-center pt-4 px-4">
            <div 
              className="placeholder bg-secondary rounded mx-auto"
              style={{
                width: '150px',
                height: '150px',
                animation: 'pulse 1.5s ease-in-out infinite alternate'
              }}
            />
          </div>
          <Card.Body className="console-card-body d-flex flex-column justify-content-between">
            <div>
              <div 
                className="placeholder bg-secondary rounded mb-3 mx-auto"
                style={{
                  width: '70%',
                  height: '24px',
                  animation: 'pulse 1.5s ease-in-out infinite alternate'
                }}
              />
            </div>
            <div className="text-center mt-auto">
              <div 
                className="placeholder bg-primary rounded-pill mx-auto"
                style={{
                  width: '120px',
                  height: '38px',
                  animation: 'pulse 1.5s ease-in-out infinite alternate'
                }}
              />
            </div>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
);

const PaginationSkeleton = () => (
  <div className="d-flex justify-content-center mt-4">
    <div className="d-flex gap-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="placeholder bg-secondary rounded"
          style={{
            width: '40px',
            height: '40px',
            animation: 'pulse 1.5s ease-in-out infinite alternate'
          }}
        />
      ))}
    </div>
  </div>
);

const GenericSkeleton = () => (
  <div className="skeleton-container">
    <div 
      className="placeholder bg-secondary rounded mb-3"
      style={{
        width: '100%',
        height: '200px',
        animation: 'pulse 1.5s ease-in-out infinite alternate'
      }}
    />
    <div 
      className="placeholder bg-secondary rounded mb-2"
      style={{
        width: '80%',
        height: '20px',
        animation: 'pulse 1.5s ease-in-out infinite alternate'
      }}
    />
    <div 
      className="placeholder bg-secondary rounded mb-2"
      style={{
        width: '60%',
        height: '20px',
        animation: 'pulse 1.5s ease-in-out infinite alternate'
      }}
    />
    <div 
      className="placeholder bg-secondary rounded"
      style={{
        width: '70%',
        height: '20px',
        animation: 'pulse 1.5s ease-in-out infinite alternate'
      }}
    />
  </div>
);

import { useLocation } from 'react-router-dom';

function Content({
  title,
  breadcrumbItems = [],
  children,
  seoTitle,
  seoDescription,
  seoKeywords,
  seoUrl,
  isLoading = false,
  skeletonType = 'generic' // 'console', 'generic', 'pagination'
}) {
  const location = useLocation();

  const defaultTitle = "Talento Games";
  const defaultDescription = "Venta de juegos retro.";
  const defaultKeywords = "consolas, videojuegos, Talento Games, juegos, eventos gamer";
  const defaultImage = "/images/Logo.webp";

  const defaultUrl = seoUrl || window.location.origin + location.pathname;

  const renderSkeleton = () => {
    switch (skeletonType) {
      case 'console':
        return (
          <>
            <PaginationSkeleton />
            <ConsoleSkeleton />
            <PaginationSkeleton />
          </>
        );
      case 'pagination':
        return <PaginationSkeleton />;
      default:
        return <GenericSkeleton />;
    }
  };
  
  const defaultUrl = window.location.href;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Helmet>
        <title>{seoTitle ? `${seoTitle} | Talento Games` : defaultTitle}</title>
        <meta name="description" content={seoDescription || defaultDescription} />
        <meta name="keywords" content={seoKeywords || defaultKeywords} />
        <meta name="author" content="Talento Games" />

        <meta property="og:title" content={seoTitle ? `${seoTitle} | Talento Games` : defaultTitle} />
        <meta property="og:description" content={seoDescription || defaultDescription} />
        <meta property="og:image" content={seoImage || defaultImage} />
        <meta property="og:url" content={seoUrl || defaultUrl} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle ? `${seoTitle} | Talento Games` : defaultTitle} />
        <meta name="twitter:description" content={seoDescription || defaultDescription} />
        <meta name="twitter:image" content={defaultImage} />
        
        <style>
          {`
            @keyframes pulse {
              0% { opacity: 0.6; }
              100% { opacity: 1; }
            }
            .skeleton-container .placeholder {
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: shimmer 1.5s infinite;
            }
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
          `}
        </style>
      </Helmet>

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
            {isLoading ? renderSkeleton() : children}
          </motion.div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default Content;