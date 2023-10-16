import sendRequest from "./send-request"

const BASE_URL = "/api/product"

// Get all existing products
export function getAllProducts() {
    return sendRequest(BASE_URL)
}

// Add a new product to existing array of products
export function addProducts(productData) {
    return sendRequest(`${BASE_URL}`, "POST", productData)
}

// Update an existing product with new details
export function editProducts(productData) {
    return sendRequest(`${BASE_URL}/${productData.productId}`, "PUT", productData)
}

// Find products with specific scrum master name
export function findProductsByScrumMasterName(scrumMasterNameData) {
    return sendRequest(`${BASE_URL}/findByScrumMasterName`, "POST", scrumMasterNameData)
}

// Find products with specific developer name
export function findProductsByDeveloperName(developerNameData) {
    return sendRequest(`${BASE_URL}/findByDeveloperName`, "POST", developerNameData)
}
