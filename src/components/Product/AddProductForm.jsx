import React, { useState } from 'react';
import { API_BASE_URL } from '../ApiConfig';

const AddProductForm = ({ siteAlias }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageId, setImageId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Создание нового товара
      const response = await fetch(`${API_BASE_URL}/product/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          alias: siteAlias,
          product_info: {
            name,
            description,
            price: parseFloat(price),
            image_id: parseInt(imageId, 10)
          }
        })
      });

      const data = await response.json();

      if (response.ok && data.status === 'OK') {
        // Обновление страницы после успешного добавления товара
        window.location.reload();
      } else {
        setError(data.error || 'Ошибка при добавлении товара');
      }
    } catch (error) {
      console.error('Ошибка при добавлении товара:', error);
      setError('Ошибка при добавлении товара. Попробуйте снова позже.');
    }
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
      {error && <div className="error-message">{error}</div>}
      <button type="submit" className="product-details-button">Добавить</button>
    </form>
  );
};

export default AddProductForm;
