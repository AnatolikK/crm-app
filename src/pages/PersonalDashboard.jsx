import React, { useState, useEffect } from 'react';
import NavigationControlPanel from '../components/NavigationControlPanel';
import EditProfileForm from '../components/PersonalDashboardComponent/EditProfileForm';
import MessageSender from '../components/PersonalDashboardComponent/MessageSender';
import Chart from '../components/PersonalDashboardComponent/Chart';
import '../styles/PersonalDashboard.css';

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
        <div className="top-section">
          <div className="dashboard-section personal-info">
            {editMode ? (
              <EditProfileForm userData={userData} onSaveChanges={handleSaveChanges} />
            ) : (
              <div className="user-info">
                <div>
                  <img src={selectedImage || userData.photo} alt="User" className="profile-photo" />
                </div>
                <div className="info-section">
                  <div className="profile-header">
                    <h3>Персональная информация</h3>
                    <button onClick={() => setEditMode(true)}>Редактировать</button>
                  </div>
                  <p>Логин: {userData.username}</p>
                  <p>Почта: {userData.email}</p>
                  <p>Телефон: {userData.phone}</p>
                  <div className="messengers">
                    <span>Мессенджеры</span>
                    <img src="/public/vk_icon.png" alt="VK" />
                    <img src="/public/telegram_icon.png" alt="Telegram" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="dashboard-section message-sender">
            <MessageSender />
          </div>
        </div>
        <div className="dashboard-section chart-section">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default PersonalDashboard;
