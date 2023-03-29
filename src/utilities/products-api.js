import sendRequest from "./send-request"

const BASE_URL = '/api/product'

export function getAllProducts() {
    console.log("inside api/getAllProducts")
    return sendRequest(BASE_URL)
}

export function addProducts(productData) {
    console.log("inside api/addProducts")
    return sendRequest(`${BASE_URL}`, "POST", productData)
}

export function editProducts(productId, productData) {
    console.log("inside api/editProducts")
    return sendRequest(`${BASE_URL}/${productId}`, "PUT", productData)
}