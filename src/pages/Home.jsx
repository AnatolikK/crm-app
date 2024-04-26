import React from 'react';
import Header from '../components/Header'; // Импортируем компонент шапки

const Home = () => {
  return (
    <div>
      <Header /> {/* Вставляем компонент шапки */}
      <div className="content">
        <h1>Home Page</h1>
        <button onClick={() => window.location.href = '/about'}>Go to About</button>
      </div>
    </div>
  );
};

export default Home;
