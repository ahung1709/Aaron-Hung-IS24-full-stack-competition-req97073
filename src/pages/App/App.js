import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import * as productServices from '../../utilities/products-service';

import AllProductsPage from '../AllProductsPage/AllProductsPage';
import NewProductPage from '../NewProductPage/NewProductPage';
import EditProductPage from '../EditProductPage/EditProductPage';

import './App.css';

function App() {

  const [products, setProducts] = useState([])

  // Get all existing products
  const getAllProducts = async () => {
    const allProducts = await productServices.getAllProducts();
    // Set products to the list of all products only if API is present or healthy
    if (allProducts) setProducts(allProducts)
  };

  useEffect(() => {
    getAllProducts()
  }, [])

  // Add a new product to existing products, and get updated list of existing products
  async function handleAddProduct(productData) {
    const updatedProducts = await productServices.addProduct(productData)
    // Set products to the updated list of all products only if API is present or healthy
    if (updatedProducts) setProducts(updatedProducts)
    getAllProducts()
  }

  // Update an existing product with a specific product ID to the product with new details, and get updated list of existing products
  async function handleEditProduct(productData) {
    const updatedProducts = await productServices.editProduct(productData)
    // Set products to the updated list of all products only if API is present or healthy
    if (updatedProducts) setProducts(updatedProducts)
    getAllProducts()
  }

  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/" element={<AllProductsPage products={products} />} />
          <Route path="/product/new" element={<NewProductPage handleAddProduct={handleAddProduct} />} />
          <Route path="/product/:productId" element={<EditProductPage handleEditProduct={handleEditProduct} products={products} />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
