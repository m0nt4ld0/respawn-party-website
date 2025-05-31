import React from 'react';
import CustomProduct from '../components/CustomProduct';
import Content from '../layouts/Content';

function CustomProductPage() {
  return (
    <Content>
      <div className="pt-5">
        <CustomProduct />
      </div>
    </Content>
  );
}

export default CustomProductPage;
