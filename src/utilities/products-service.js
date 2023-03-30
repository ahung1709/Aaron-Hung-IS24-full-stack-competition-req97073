import * as productsAPI from './products-api';

export async function getAllProducts() {
    return await productsAPI.getAllProducts()
}

export async function addProduct(productData) {
    return await productsAPI.addProducts(productData)
}

export async function editProduct(productData) {
    return await productsAPI.editProducts(productData)
}

