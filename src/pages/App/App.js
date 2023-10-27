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
    await productServices.addProduct(productData)
    // Set products to the updated list of all products only if API is present or healthy
    getAllProducts()
  }

  // Update an existing product with a specific product ID to the product with new details, and get updated list of existing products
  async function handleEditProduct(productData) {
    await productServices.editProduct(productData)
    // Set products to the updated list of all products only if API is present or healthy
    getAllProducts()
  }

  // Delete an existing product with a specific product ID, and get updated list of existing products
  async function handleDeleteProduct(productId) {
    await productServices.deleteProduct(productId)
    // Set products to the updated list of all products only if API is present or healthy
    getAllProducts()
  }

  async function handleFindProductsByScrumMasterName(scrumMasterNameData) {
    const matchedProducts = await productServices.findProductsByScrumMasterName(scrumMasterNameData)
    // Set products to the matched list of products only if API is present or healthy
    if (matchedProducts) setProducts(matchedProducts)
  }

  async function handleFindProductsByDeveloperName(developerNameData) {
    const matchedProducts = await productServices.findProductsByDeveloperName(developerNameData)
    // Set products to the matched list of products only if API is present or healthy
    if (matchedProducts) setProducts(matchedProducts)
  }

  return (
    <div className="App">
      <>
        <Routes>
          <Route 
            path="/" 
            element={
              <AllProductsPage 
                products={products} 
                handleFindProductsByScrumMasterName={handleFindProductsByScrumMasterName} 
                handleFindProductsByDeveloperName={handleFindProductsByDeveloperName} 
                getAllProducts={getAllProducts} 
                handleDeleteProduct={handleDeleteProduct} />
              } />
          <Route 
            path="/product/new" 
            element={
              <NewProductPage 
                handleAddProduct={handleAddProduct} />
              } />
          <Route 
            path="/product/:productId" 
            element={
              <EditProductPage 
                handleEditProduct={handleEditProduct} 
                products={products} />
              } />
        </Routes>
      </>
    </div>
  );
}

export default App;
