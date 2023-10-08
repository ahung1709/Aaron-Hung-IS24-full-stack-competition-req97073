const { request } = require('express')
const productsData = require('../data/products')
const productsService = require('../services/product')

module.exports = {
    index, 
    addProduct, 
    updateProduct, 
    findProductsByScrumMasterName, 
    findProductsByDeveloperName, 
}

// Return an array of all existing products as JSON
// This function will also generate random sample products if it is the first time running after backend server starts
async function index(req, res) {
    try {
        res.status(200).json(await productsService.getAll())
    } catch (err) {
        // res.status(500).json(err)
        console.error(err)
        res.status(500).json({
            error: 'Failed to show all products for unknown reasons'
        })
    }
}

// add new product object into the array of existing products, and return the updated array of products as JSON
async function addProduct(req, res) {
    try {
        await productsService.create(req.body)
        res.status(204).send()
    } catch (err) {
        console.error("error:", err)
        res.status(500).json(err)
    }
}

// update an existing product with new details from a product object with the same product ID, and return the updated array of products as JSON
// if the product ID of the product object with new details cannot be found in the product IDs of existing products, an error will be responded
async function updateProduct(req, res) {
    try {
        await productsService.update(req.body)
        res.status(204).send()
    } catch (err) {
        console.error("error:", err)
        res.status(500).json(err)
    }
}

// Find all products with a specific scrum master name
// The search is not case-sensitive
async function findProductsByScrumMasterName(req, res) {
    try {
        res.status(200).json(
            await productsService.getByScrumMasterName(req.body.scrumMasterName)
        )
    } catch (err) {
        console.error("error:", err)
        res.status(500).json(err)
    }
}

// Find all products with a specific developer name
// The search is not case-sensitive
async function findProductsByDeveloperName(req, res) {
    try {
        res.status(200).json(
            await productsService.getByDeveloperName(req.body.developerName)
        )
    } catch (err) {
        console.error("error:", err)
        res.status(500).json(err)   
    }
}

//-- Helper functions for generating random products and product details --

// Generate and add random products
function generateProducts(num) {
    let maxlength = productsData.maxInitialProducts
    for (let i=0; i<Math.min(num, maxlength); i++) {
        const id = generateUId()
        const productName = generateProductName(productsData.productNames)
        const productOwnerName = generateProductOwner(productsData.productOwnerNames)
        const developers = generateDevelopers(productsData.developers, 1, 5)
        const scrumMasterName = generateScrumMaster(productsData.scrumMasterNames)
        const startDate = generateDate(new Date(2023, 3, 31), -365)
        const methodology = generateMethodology(productsData.methodologies)

        const product = createProduct(
            id, 
            productName, 
            productOwnerName, 
            developers, 
            scrumMasterName, 
            startDate, 
            methodology
        )
        
        productsData.allProducts.push(product)
    }
}

// Generate unique random product ID that doesn't collide with previously generated product IDs
function generateUId() {
    let pId = ""
    // generate new product ID until it doesn't collide with previously generated product IDs
    do {
        pId = "P"+(Math.random().toString(36).substr(2,5));
    } while (productsData.allProducts.reduce( (acc, product) => acc || (product.productName === pId), false)); 
    return pId
}

// Generate random product name that is not previously included in the list of products
function generateProductName(arrProductNames) {
    let selectedProductName = ""
    // generate new product name until it is a product name not previously included in the list of products
    do {
        selectedProductName = arrProductNames[getRandomInt(0, arrProductNames.length)]
    } while (productsData.allProducts.reduce( (acc, product) => acc || (product.productName === selectedProductName), false)); // ensure automatic generated product name is unique
    return selectedProductName
}

// Generate random product owner from an array of product owners
function generateProductOwner(arrProductOwner) {
    return arrProductOwner[getRandomInt(0, arrProductOwner.length)]
}

// Generate array of a random number of random developers from an array of developers.
// The random number of random developers is determined by parameters "minDevelopers" and "maxDevelopers"
function generateDevelopers(arrDevelopers, minDevelopers, maxDevelopers) {
    const numDevelopers = getRandomInt(minDevelopers, maxDevelopers)
    let newArrDevelopers = []
    let selectedDeveloper = ""
    for (let j=0; j<numDevelopers; j++) {
        // generate new developer name until it is a developer name not previously selected
        do {
            selectedDeveloper = arrDevelopers[getRandomInt(0, arrDevelopers.length)]
        } while (newArrDevelopers.includes(selectedDeveloper));
        newArrDevelopers.push(selectedDeveloper);
    }
    return newArrDevelopers
}

// Generate random scrum master from an array of scrum masters
function generateScrumMaster(arrScrumMasters) {
    return arrScrumMasters[getRandomInt(0, arrScrumMasters.length)]
}

// Generate random date between "start" date provided and the date that is "days" days from the "start" date
function generateDate(start, days) {
    const date = new Date(start.getTime() + (Math.random()*days*24*60*60*1000))
    const year = date.getFullYear().toString()
    let month = (date.getMonth() + 1).toString()
    month.length === 1 ? month = "0" + month : month
    let day = (date.getDate()).toString()
    day.length === 1 ? day = "0" + day : day
    const strDate = year + "/" + month + "/" + day
    return strDate
}

// Generate random methodology from an array of methodologies
function generateMethodology(arrMethodologies) {
    return arrMethodologies[getRandomInt(0, arrMethodologies.length)]
}

// Generate random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// Return a product object with the details of information provided as parameters
function createProduct(productId = "", productName= "", ownerName= "", arrDevelopers = [], scrumMasterName = "", startDate = "", methodology = "") {
    return {
        "productId": productId,
        "productName": productName,
        "productOwnerName": ownerName, 
        "Developers": arrDevelopers, 
        "scrumMasterName": scrumMasterName, 
        "startDate": startDate, 
        "methodology": methodology, 
    };
}
