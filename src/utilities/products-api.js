import sendRequest from "./send-request"

const BASE_URL = '/api/products'

export function getAllProducts() {
    console.log("inside api/getAllProducts")
    return sendRequest(BASE_URL)
}

export function prepopulateProducts() {
    console.log("inside api/prepopulateProducts")
    return sendRequest(`${BASE_URL}/prepopulate`)
}

