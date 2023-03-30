import { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import * as productServices from '../../utilities/products-service';

import AllProductsPage from '../AllProductsPage/AllProductsPage';
import NewProductPage from '../NewProductPage/NewProductPage';
import EditProductPage from '../EditProductPage/EditProductPage';

import './App.css';

function App() {
  console.log("Inside App")

  const [products, setProducts] = useState([])

  const getAllProducts = async () => {
    const allProducts = await productServices.getAllProducts();
    setProducts(allProducts);
  };

  useEffect(() => {
    getAllProducts()
  }, [])

  async function handleAddProduct(productData) {
    const updatedProducts = await productServices.addProduct(productData)
    setProducts(updatedProducts)   
    getAllProducts()
  }

  async function handleEditProduct(productData) {
    const updatedProducts = await productServices.editProduct(productData)
    setProducts(updatedProducts)
    getAllProducts()
  }

  console.log("products: ");
  console.log(products)

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
