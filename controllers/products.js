const productsData = require('../data/products')

module.exports = {
    index, 
    prepopulate, 
    addProduct, 
    updateProduct, 
}

async function index(req, res) {
    console.log("inside index")  
    try {
        console.log(productsData.allProducts)
        res.json(productsData.allProducts)
    } catch(err) {
        res.json(err)
    }
}

function prepopulate(req, res) {
    console.log("inside controller/prepopulate")
    try {
        productsData.allProducts = [...generateProducts(3)]
        res.json(productsData.allProducts)
    } catch {
        res.json(err)
    }
}

function addProduct(req, res) {
    console.log(req)
    try {
        const id = generateUId()
        const productName = req.body.productName
        const productOwnerName = req.body.productOwnerName
        const developers = req.body.Developers
        const scrumMasterName = req.body.scrumMasterName
        const startDate = req.body.startDate
        const methodology = req.body.methodology
            
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
        res.json(productsData.allProducts)
    } catch {
        res.json(err)
    }
}

function updateProduct(req, res) {
    try {
        let productFound = productsData.allProducts.find(p => p.productId === req.body.productId)
        productFound.productName = req.body.productName
        productFound.productOwnerName = req.body.productOwnerName
        productFound.Developers = req.body.Developers
        productFound.scrumMasterName = req.body.scrumMasterName
        productFound.startDate = req.body.startDate
        productFound.methodology = req.body.methodology
        res.json(productFound)
    } catch {
        res.json(err)
    }
       
}

//-- Helper function --

function generateProducts(num) {
    let products = []
    let maxlength = 40
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
        console.log("loop"+i)
        console.log(product)
        
        products.push(product)
    }
    console.log("products.length")
    console.log(products.length)
    return products
}

function generateUId() {
    let pId
    do {
        pId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    } while (productsData.allProducts.includes(pId));
    return pId
}

function generateProductName(arrProductNames) {
    return arrProductNames[getRandomInt(0, arrProductNames.length)]
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
