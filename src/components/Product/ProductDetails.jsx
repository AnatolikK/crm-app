import React from 'react';

const ProductDetails = ({ product }) => {
  return (
    <div className="product-details-container">
      <h3>{product.name}</h3>
      <p><strong>Описание:</strong> {product.description}</p>
      <p><strong>Цена:</strong> {product.price}</p>
      <p><strong>ID изображения:</strong> {product.image_id}</p>
    </div>
  );
};

export default ProductDetails;
