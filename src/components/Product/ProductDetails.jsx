import React from 'react';

const ProductDetails = ({ product }) => {
  return (
    <div className="product-details-container">
      <h3>{product.name}</h3>
      <p><strong>Категория:</strong> {product.category}</p>
      <p><strong>Цена:</strong> {product.price}</p>
    </div>
  );
};

export default ProductDetails;
