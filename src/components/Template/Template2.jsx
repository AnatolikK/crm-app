import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import WelcomeScreen from './WelcomeScreen';
import Products from './Products';
import AboutUs from './AboutUs';
import Footer from './Footer';
import EditorPanel from '../Constructor/EditorPanel';

const Template2 = () => {
  const { alias } = useParams();
  const [components, setComponents] = useState(() => {
    const savedComponents = localStorage.getItem('savedComponents');
    return savedComponents
      ? JSON.parse(savedComponents)
      : {
          header: { content: 'Header', backgroundColor: '#1a1a1a', width: '100%', height: '100px', fontSize: '24px' },
          welcomeScreen: { content: 'Welcome Screen', backgroundColor: '#1a1a1a', width: '100%', height: '200px', fontSize: '24px' },
          products: { content: 'Products', backgroundColor: '#1a1a1a', width: '100%', height: '200px', fontSize: '24px' },
          aboutUs: { content: 'About Us', backgroundColor: '#1a1a1a', width: '100%', height: '200px', fontSize: '24px' },
          footer: { content: 'Footer', backgroundColor: '#1a1a1a', width: '100%', height: '100px', fontSize: '24px' },
        };
  });

  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    const savedComponents = localStorage.getItem('savedComponents');
    if (savedComponents) {
      setComponents(JSON.parse(savedComponents));
    }
  }, []);

  const handleComponentClick = (componentKey) => {
    setSelectedComponent(componentKey);
  };

  const handleContentChange = (newContent) => {
    setComponents((prevComponents) => ({
      ...prevComponents,
      [selectedComponent]: {
        ...prevComponents[selectedComponent],
        content: newContent,
      },
    }));
  };

  const handleColorChange = (newColor) => {
    setComponents((prevComponents) => ({
      ...prevComponents,
      [selectedComponent]: {
        ...prevComponents[selectedComponent],
        backgroundColor: newColor,
      },
    }));
  };

  const handleSizeChange = (newWidth, newHeight) => {
    setComponents((prevComponents) => ({
      ...prevComponents,
      [selectedComponent]: {
        ...prevComponents[selectedComponent],
        width: newWidth,
        height: newHeight,
      },
    }));
  };

  const handleFontSizeChange = (newFontSize) => {
    setComponents((prevComponents) => ({
      ...prevComponents,
      [selectedComponent]: {
        ...prevComponents[selectedComponent],
        fontSize: newFontSize,
      },
    }));
  };

  const handleSave = () => {
    console.log('Сохранено:', components);
    localStorage.setItem('savedComponents', JSON.stringify(components));
  };

  return (
    <div className="template2">
      <Header
        content={components.header.content}
        backgroundColor={components.header.backgroundColor}
        width={components.header.width}
        height={components.header.height}
        fontSize={components.header.fontSize}
        onClick={() => handleComponentClick('header')}
      />
      <WelcomeScreen
        content={components.welcomeScreen.content}
        backgroundColor={components.welcomeScreen.backgroundColor}
        width={components.welcomeScreen.width}
        height={components.welcomeScreen.height}
        fontSize={components.welcomeScreen.fontSize}
        onClick={() => handleComponentClick('welcomeScreen')}
      />
      <Products
        content={components.products.content}
        backgroundColor={components.products.backgroundColor}
        width={components.products.width}
        height={components.products.height}
        fontSize={components.products.fontSize}
        onClick={() => handleComponentClick('products')}
      />
      <AboutUs
        content={components.aboutUs.content}
        backgroundColor={components.aboutUs.backgroundColor}
        width={components.aboutUs.width}
        height={components.aboutUs.height}
        fontSize={components.aboutUs.fontSize}
        onClick={() => handleComponentClick('aboutUs')}
      />
      <Footer
        content={components.footer.content}
        backgroundColor={components.footer.backgroundColor}
        width={components.footer.width}
        height={components.footer.height}
        fontSize={components.footer.fontSize}
        onClick={() => handleComponentClick('footer')}
      />
      {selectedComponent && (
        <EditorPanel
          selectedComponent={components[selectedComponent]}
          onChangeContent={handleContentChange}
          onChangeColor={handleColorChange}
          onChangeSize={handleSizeChange}
          onChangeFontSize={handleFontSizeChange}
          onSave={handleSave}
          alias={alias} // Передаем alias в EditorPanel
        />
      )}
    </div>
  );
};

export default Template2;
