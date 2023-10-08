const fs = require('node:fs/promises')

module.exports = {
    getAll, 
    getById, 
    update, 
    create, 
    getByScrumMasterName, 
    getByDeveloperName
}

let products = []

async function getAll() { 
    // generateProduct
    if (products.length === 0) {
        await loadProducts();

        // products = [
        //     {
        //         "productId": "Prplw8",
        //         "productName": "Product10",
        //         "productOwnerName": "Anthony Shanthan",
        //         "Developers": [
        //             "Arthur Riches",
        //             "Luna Kalay",
        //             "Michael Grams"
        //         ],
        //         "scrumMasterName": "Aidan McGhie",
        //         "startDate": "2022/10/01",
        //         "methodology": "Agile"
        //     },
        //     {
        //         "productId": "Prmxic",
        //         "productName": "Product26",
        //         "productOwnerName": "Anthony Shanthan",
        //         "Developers": [
        //             "Phoenix Gutierrez",
        //             "James Andreas",
        //             "Adam Salyer"
        //         ],
        //         "scrumMasterName": "Aidan McGhie",
        //         "startDate": "2022/11/30",
        //         "methodology": "Agile"
        //     },
        // ];

        // await saveProducts()
        // await loadProducts();
    } else {
        // await loadProducts();
    }
    return products 
}

async function getById(id) { 
    const itemFound = (await getAll()).find((product) => product.productId === id)
    if (!itemFound) {
        throw new Error ("Product was not found!");
    } else {
        return itemFound;
    }
}

async function update(product) { 
    const idxProductFound = await getById(product.productId)
    idxProductFound.productName = product.productName
    idxProductFound.productOwnerName = product.productOwnerName
    idxProductFound.Developers = product.Developers
    idxProductFound.scrumMasterName = product.scrumMasterName
    idxProductFound.startDate = product.startDate
    idxProductFound.methodology = product.methodology
    
    await saveProducts()
}

async function create(product) { 
    if (!product.productName) {
        throw new Error ("Product name was missing!");
    } else if (!product.productOwnerName) {
        throw new Error ("Owner name was missing!");
    } else if (!Array.isArray(product.Developers) || !product.Developers.filter(n => n).length) {
        throw new Error ("Developers is not an array, is an empty array!!");
    } else if (!product.scrumMasterName) {
        throw new Error ("Scrum master name was missing!");
    } else if (!product.startDate) {
        throw new Error ("Start date was missing!");
    } else if (!product.methodology) {
        throw new Error ("Methodology was missing!");
    } else {
        const productId = generateUId()
        const productName = product.productName
        const productOwnerName = product.productOwnerName
        const developers = product.Developers.filter(n => n)
        const scrumMasterName = product.scrumMasterName
        const startDate = product.startDate
        const methodology = product.methodology
    
        const newProduct = createProduct({
            productId, 
            productName, 
            productOwnerName, 
            developers, 
            scrumMasterName, 
            startDate, 
            methodology
        })
        products.push(newProduct)
    
        await saveProducts()
    }

}

async function getByScrumMasterName(scrumMaster) {
    const lowerScrumMasterNameNeeded = scrumMaster.toLowerCase()
    let productsFound
    if (scrumMaster) {
        productsFound = (await getAll()).filter((product) => product.scrumMasterName.toLowerCase() === lowerScrumMasterNameNeeded)
    } else {
        productsFound = products.slice()
    }
   
    if (!productsFound) {
        throw new Error ("Product was not found!");
    } else {
        return productsFound;
    }
}

async function getByDeveloperName(developer) {
    const lowerDeveloperNameNeeded = developer.toLowerCase()
    let productsFound
    if (developer) {
        productsFound = (await getAll()).filter((product) => {
            return product.Developers.find((developer) => {
                return developer.toLowerCase() === lowerDeveloperNameNeeded
            })
        })
    } else {
        productsFound = products.slice()
    }

    if (!productsFound) {
        throw new Error ("Product was not found!");
    } else {
        return productsFound;
    }
}


async function saveProducts() {
    await fs.writeFile("data/products.json", JSON.stringify(products))
}

async function loadProducts() {
    products = JSON.parse(await fs.readFile("data/products.json", "utf-8"))
}

//-- Helper functions for generating product details --

function generateUId() {
    let pId = ""
    // generate new product ID until it doesn't collide with previously generated product IDs
    do {
        pId = "P"+(Math.random().toString(36).substr(2,5));
    } while (products.find((product) => product.productId === pId)); 
    
    return pId
}

// function createProduct(productId = "", productName= "", ownerName= "", arrDevelopers = [], scrumMasterName = "", startDate = "", methodology = "") {
function createProduct(product) {
    const {
        productId, 
        productName, 
        productOwnerName, 
        developers, 
        scrumMasterName, 
        startDate, 
        methodology
    } = product

    if (!productId) {
        throw new Error ("Product ID was missing!");
    } else if (!productName) {
        throw new Error ("Product name was missing!");
    } else if (!productOwnerName) {
        throw new Error ("Owner name was missing!");
    } else if (!Array.isArray(developers) || !developers.filter(n => n).length) {
        throw new Error ("Developers is not an array, is an empty array!!");
    } else if (!scrumMasterName) {
        throw new Error ("Scrum master name was missing!");
    } else if (!startDate) {
        throw new Error ("Start date was missing!");
    } else if (!methodology) {
        throw new Error ("Methodology was missing!");
    } else {
        return {           
            "productId": productId,
            "productName": productName,
            "productOwnerName": productOwnerName, 
            "Developers": developers, 
            "scrumMasterName": scrumMasterName, 
            "startDate": startDate, 
            "methodology": methodology, 
        };
    }
}


