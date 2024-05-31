import React, { useState } from 'react';

const AddProductForm = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageId, setImageId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      description,
      price,
      image_id: parseInt(imageId, 10)
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
        placeholder="Описание" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Цена" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="ID изображения" 
        value={imageId} 
        onChange={(e) => setImageId(e.target.value)} 
      />
      <button type="submit" className="product-details-button">Добавить</button>
    </form>
  );
};

export default AddProductForm;
