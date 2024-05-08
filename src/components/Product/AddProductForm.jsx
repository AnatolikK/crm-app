// AddProductForm.js
import React, { useState } from 'react';

const AddProductForm = ({ onAddProduct, onClose }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Math.floor(Math.random() * 1000), // Генерируем случайный id
      name,
      category,
      price,
    };
    onAddProduct(newProduct);
    onClose(); // Закрываем форму после добавления товара
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Название" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Категория" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input type="text" placeholder="Цена" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddProductForm;
