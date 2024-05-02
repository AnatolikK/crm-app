import React, { useState } from 'react';

const EditProfileForm = ({ userData, onSaveChanges }) => {
  const [editedData, setEditedData] = useState(userData);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setSelectedImage(imageUrl);
  };

  const handleSave = () => {
    const updatedUserData = { ...editedData, photo: selectedImage || userData.photo };
    onSaveChanges(updatedUserData);
  };

  return (
    <div className="edit-profile-form">
      <label>
        Логин:
        <input type="text" name="username" value={editedData.username} onChange={handleInputChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={editedData.email} onChange={handleInputChange} />
      </label>
      <label>
        Телефон:
        <input type="text" name="phone" value={editedData.phone} onChange={handleInputChange} />
      </label>
      <label>
        Изображение:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>
      {/* Здесь можно добавить другие поля для редактирования */}
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default EditProfileForm;
