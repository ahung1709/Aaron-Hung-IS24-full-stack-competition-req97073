import * as productsAPI from './products-api';

// Get all existing products
export async function getAllProducts() {
    return await productsAPI.getAllProducts()
}

// Add a new product to existing array of products
export async function addProduct(productData) {
    return await productsAPI.addProducts(productData)
}

// Update an existing product with new details
export async function editProduct(productData) {
    return await productsAPI.editProducts(productData)
}

