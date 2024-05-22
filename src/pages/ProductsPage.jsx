import React, { useState } from 'react';
import NavigationControlPanel from '../components/NavigationControlPanel';
import productsData from '../components/Product/productsData'; 
import ProductDetails from '../components/Product/ProductDetails'; 
import AddProductForm from '../components/Product/AddProductForm'; 
import '../styles/ProductsPage.css'; 

const loadProductsFromLocalStorage = () => {
  const storedProducts = localStorage.getItem('products');
  return storedProducts ? JSON.parse(storedProducts) : productsData;
};

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [showAddForm, setShowAddForm] = useState(false); 
  const [products, setProducts] = useState(loadProductsFromLocalStorage); 
  const [searchTerm, setSearchTerm] = useState('');

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetails = () => {
    setSelectedProduct(null);
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  const handleAddProduct = (newProduct) => {
    // Добавляем знак рубля к цене товара
    newProduct.price = `${newProduct.price} ₽`;
  
    // Добавляем новый товар к списку
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
  
    // Сохраняем обновленный список товаров в localStorage
    saveProductsToLocalStorage(updatedProducts);
  };
  

  const renderProductRow = (product) => (
    <tr key={product.id} onClick={() => handleProductClick(product)}>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.price}</td>
    </tr>
  );

  const saveProductsToLocalStorage = (updatedProducts) => {
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NavigationControlPanel />
      <div className="product-list-container">
        <h2>Список товаров</h2>
        <input 
          type="text" 
          placeholder="Поиск..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleShowAddForm}>Добавить товар</button>
        <table className="product-table">
          <thead>
            <tr>
              <th>Название</th>
              <th>Категория</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(renderProductRow)}
          </tbody>
        </table>
        {selectedProduct && <ProductDetails product={selectedProduct} onClose={handleCloseProductDetails} />}
        {showAddForm && <AddProductForm onAddProduct={handleAddProduct} onClose={handleCloseAddForm} />}
      </div>
    </div>
  );
};

export default ProductPage;
