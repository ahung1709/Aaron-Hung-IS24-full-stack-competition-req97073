import * as productsAPI from './products-api';

export async function getAllProducts() {
    console.log("inside service/getAllProducts")
    return await productsAPI.getAllProducts()
}

export async function addProduct(productData) {
    console.log("inside service/addProducts")
    return await productsAPI.addProducts(productData)
}

export async function editProduct(productId, productData) {
    console.log("inside service/editProducts")
    return await productsAPI.editProducts(productId, productData)
}

