import * as productsAPI from './products-api';

export async function getAllProducts() {
    console.log("inside service/getAllProducts")
    return await productsAPI.getAllProducts()
}

export async function prepopulateProducts() {
    console.log("inside service/prepopulateProducts")
    return await productsAPI.prepopulateProducts()
}

