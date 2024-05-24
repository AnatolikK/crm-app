import React, { useState } from 'react';

const AddProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Math.floor(Math.random() * 1000),
      name,
      category,
      price,
    };
    onAddProduct(newProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <h3>Добавить товар</h3>
      <input 
        type="text" 
        placeholder="Название" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Категория" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Цена" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
      />
      <button type="submit" className="product-details-button">Добавить</button>
    </form>
  );
};

export default AddProductForm;
