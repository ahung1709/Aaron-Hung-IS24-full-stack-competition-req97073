const { request } = require('express')
const productsData = require('../data/products')

module.exports = {
    index, 
    addProduct, 
    updateProduct, 
}

async function index(req, res) {
    console.log("inside index")  
    try {
        // Pre-populate random data on initial execution
        if (productsData.initial) {
            generateProducts(productsData.numInitialProducts)
            productsData.initial = false
        }
        res.status(200).json(productsData.allProducts)
    } catch(err) {
        res.status(400).json(err)
    }
}

function addProduct(req, res) {
    try {
        const id = generateUId()
        const productName = req.body.productName ? req.body.productName : ""
        const productOwnerName = req.body.productOwnerName ? req.body.productOwnerName : ""
        const developers = req.body.Developers ? req.body.Developers : []
        const scrumMasterName = req.body.scrumMasterName ? req.body.scrumMasterName : ""
        const startDate = req.body.startDate ? req.body.startDate : ""
        const methodology = req.body.methodology ? req.body.methodology : ""
            
        const newProduct = createProduct(
            id, 
            productName, 
            productOwnerName, 
            developers, 
            scrumMasterName, 
            startDate, 
            methodology
        )
    
        productsData.allProducts.push(newProduct)
        res.status(200).json(productsData.allProducts)
    } catch {
        res.status(400).json(err)
    }
}

function updateProduct(req, res) {
    try {
        let idxProductFound = productsData.allProducts.findIndex(p => p.productId === req.body.productId)
        productsData.allProducts[idxProductFound].productName = req.body.productName
        productsData.allProducts[idxProductFound].productOwnerName = req.body.productOwnerName
        productsData.allProducts[idxProductFound].Developers = req.body.Developers
        productsData.allProducts[idxProductFound].scrumMasterName = req.body.scrumMasterName
        productsData.allProducts[idxProductFound].startDate = req.body.startDate
        productsData.allProducts[idxProductFound].methodology = req.body.methodology
        res.status(200).json(productsData.allProducts)
    } catch {
        res.status(400).json(err)
    }
       
}

//-- Helper functions --

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

function generateUId() {
    let pId = ""
    do {
        pId = "P"+(Math.random().toString(36).substr(2,5));
    } while (productsData.allProducts.reduce( (acc, product) => acc || (product.productName === pId), false)); // ensure automatic generated ID is unique
    return pId
}

function generateProductName(arrProductNames) {
    let selectedProductName = ""
    do {
        selectedProductName = arrProductNames[getRandomInt(0, arrProductNames.length)]
    } while (productsData.allProducts.reduce( (acc, product) => acc || (product.productName === selectedProductName), false)); // ensure automatic generated product name is unique
    return selectedProductName
}

function generateProductOwner(arrProductOwner) {
    return arrProductOwner[getRandomInt(0, arrProductOwner.length)]
}

function generateDevelopers(arrDevelopers, minDevelopers, maxDevelopers) {
    const numDevelopers = getRandomInt(minDevelopers, maxDevelopers)
    let newArrDevelopers = []
    let selectedDeveloper = ""
    for (let j=0; j<numDevelopers; j++) {
        do {
            selectedDeveloper = arrDevelopers[getRandomInt(0, arrDevelopers.length)]
        } while (newArrDevelopers.includes(selectedDeveloper));
        newArrDevelopers.push(selectedDeveloper);
    }
    return newArrDevelopers
}

function generateScrumMaster(arrScrumMasters) {
    return arrScrumMasters[getRandomInt(0, arrScrumMasters.length)]
}

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

function generateMethodology(arrMethodologies) {
    return arrMethodologies[getRandomInt(0, arrMethodologies.length)]
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

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
