// ProductDetails.jsx
import React from 'react';

const ProductDetails = ({ product, onClose }) => {
  return (
    <div className="product-details-container">
      <h3>{product.name}</h3>
      <p><strong>Категория:</strong> {product.category}</p>
      <p><strong>Цена:</strong> {product.price}</p>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default ProductDetails;
