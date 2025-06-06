import React from 'react';
import CustomProduct from '../components/CustomProduct';
import Content from '../layouts/Content';

function CustomProductPage() {
  return (
    <Content 
      title="Somos Talento Games"
      seoTitle="Inicio"
      seoDescription="Descubrí los mejores juegos y consolas en alquiler en Talento Games."
      seoKeywords="venta consolas, videojuegos, Talento Games"
      seoUrl="https://talento-games.vercel.app/">
      <div className="pt-5">
        <CustomProduct />
      </div>
    </Content>
  );
}

export default CustomProductPage;
