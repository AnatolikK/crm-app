import React, { useState } from 'react';
import { API_BASE_URL } from '../ApiConfig'; // Импортируйте базовый URL

const EditProfileForm = ({ userData, onSaveChanges }) => {
  const [editedData, setEditedData] = useState(userData);
  const [selectedImageId, setSelectedImageId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleImageChange = async (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(imageFile);
      reader.onloadend = async () => {
        const byteArray = new Uint8Array(reader.result);
        try {
          const response = await fetch(`${API_BASE_URL}/image/upload`, {
            method: 'POST',
            headers: {
              'Content-Type': 'image/jpeg',
              'Authorization': `Bearer ${localStorage.getItem('token')}` // Добавьте токен авторизации
            },
            body: byteArray
          });

          const result = await response.json();
          if (result.id) {
            setSelectedImageId(result.id);
            setEditedData({ ...editedData, image_id: result.id });
          } else {
            console.error('Ошибка загрузки изображения', result.error);
          }
        } catch (error) {
          console.error('Ошибка загрузки изображения', error);
        }
      };
      reader.onerror = (error) => {
        console.error('Ошибка чтения файла изображения', error);
      };
    }
  };

  const handleSave = async () => {
    const { first_name, last_name, father_name, city, image_id } = editedData;
    const updatedUserData = { first_name, last_name, father_name, city, image_id: selectedImageId || image_id };
    try {
      const response = await fetch(`${API_BASE_URL}/admin/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Добавьте токен авторизации
        },
        body: JSON.stringify(updatedUserData)
      });

      const result = await response.json();
      if (result.status === 'OK') {
        onSaveChanges(updatedUserData);
        window.location.reload(); // Обновить страницу
      } else {
        console.error('Ошибка обновления профиля', result.error);
      }
    } catch (error) {
      console.error('Ошибка обновления профиля', error);
    }
  };

  return (
    <div className="edit-profile-form">
      <label>
        Имя:
        <input type="text" name="first_name" value={editedData.first_name} onChange={handleInputChange} />
      </label>
      <label>
        Фамилия:
        <input type="text" name="last_name" value={editedData.last_name} onChange={handleInputChange} />
      </label>
      <label>
        Отчество:
        <input type="text" name="father_name" value={editedData.father_name} onChange={handleInputChange} />
      </label>
      <label>
        Город:
        <input type="text" name="city" value={editedData.city} onChange={handleInputChange} />
      </label>
      <label>
        Изображение:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default EditProfileForm;
