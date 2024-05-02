import React, { useState, useEffect } from 'react';
import NavigationControlPanel from '../components/NavigationControlPanel';
import EditProfileForm from '../components/PersonalDashboardComponent/EditProfileForm';
import MessageSender from '../components/PersonalDashboardComponent/MessageSender';
import Chart from '../components/PersonalDashboardComponent/Chart'; // Импорт компонента с графиком

const PersonalDashboard = () => {
  const initialUserData = JSON.parse(localStorage.getItem('userData')) || {
    username: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    photo: 'https://via.placeholder.com/150',
  };

  const [userData, setUserData] = useState(initialUserData);
  const [editMode, setEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSaveChanges = (updatedUserData) => {
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    setUserData(updatedUserData);
    setEditMode(false);
  };

  useEffect(() => {
    if (!editMode) {
      setSelectedImage(null);
    }
  }, [editMode]);

  return (
    <div>
      <NavigationControlPanel />
      <div className="personal-dashboard">
        <div className="user-info">
          {editMode ? (
            <EditProfileForm userData={userData} onSaveChanges={handleSaveChanges} />
          ) : (
            <>
              <h3>Персональные данные</h3>
              <p>Логин: {userData.username}</p>
              <p>Email: {userData.email}</p>
              <p>Телефон: {userData.phone}</p>
              <img src={selectedImage || userData.photo} alt="User" />
              <button onClick={() => setEditMode(true)}>Редактировать</button>
            </>
          )}
        </div>
        <MessageSender />
        <Chart /> {/* Добавление компонента с графиком */}
      </div>
    </div>
  );
};

export default PersonalDashboard;
