import React, { useState } from 'react';
import { API_BASE_URL } from '../ApiConfig';

const AddProductForm = ({ siteAlias }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageId, setImageId] = useState(null);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = async () => {
        const byteArray = new Uint8Array(reader.result);
        try {
          const response = await fetch(`${API_BASE_URL}/image/upload`, {
            method: 'POST',
            headers: {
              'Content-Type': 'image/jpeg',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: byteArray
          });

          const result = await response.json();
          if (result.id) {
            setImageId(result.id);
          } else {
            setError(result.error || 'Ошибка загрузки изображения');
          }
        } catch (error) {
          setError('Ошибка загрузки изображения');
          console.error('Ошибка загрузки изображения:', error);
        }
      };
      reader.onerror = (error) => {
        setError('Ошибка чтения файла изображения');
        console.error('Ошибка чтения файла изображения:', error);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageId) {
      setError('Необходимо загрузить изображение');
      return;
    }

    try {
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
            image_id: imageId
          }
        })
      });

      const data = await response.json();

      if (response.ok && data.status === 'OK') {
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
        type="file" 
        accept="image/*" 
        onChange={handleImageChange} 
      />
      {imageId && <input 
        type="text" 
        placeholder="ID изображения" 
        value={imageId} 
        readOnly 
      />}
      {error && <div className="error-message">{error}</div>}
      <button type="submit" className="product-details-button">Добавить</button>
    </form>
  );
};

export default AddProductForm;
