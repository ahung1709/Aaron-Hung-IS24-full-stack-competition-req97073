import sendRequest from "./send-request"

const BASE_URL = '/api/product'

export function getAllProducts() {
    return sendRequest(BASE_URL)
}

export function addProducts(productData) {
    return sendRequest(`${BASE_URL}`, "POST", productData)
}

export function editProducts(productData) {
    return sendRequest(`${BASE_URL}/${productData.productId}`, "PUT", productData)
}