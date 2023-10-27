const fs = require("node:fs/promises")
const productsData = require("../data/productsData")

module.exports = {
    getAll,
    getById,
    update,
    create,
    deleteProduct,
    getByScrumMasterName,
    getByDeveloperName
}

let products = []

async function getAll() {
    if (!(await existsJSONFile())) {
        products = [] // clear products to empty array
        await generateProducts(5) // generate random products
    }

    // generateProduct
    if (products.length === 0) {
        await loadProducts()

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
        throw new Error ("Product was not found!")
    } else {
        return itemFound
    }
}

async function getIndexById(id) {
    const itemIndexFound = (await getAll()).findIndex((product) => product.productId === id)
    if (itemIndexFound === -1) {
        throw new Error ("Product index was not found!")
    } else {
        return itemIndexFound
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
    await getAll()
    const p = {...product}
    p.productId = generateUId()

    if (validateProduct(p)) {
        p.Developers = p.Developers.filter(n => n)
        products.push(p)

        await saveProducts()
    }
}

async function deleteProduct(id) {
    const idxProductFound = await getIndexById(id)
    products.splice(idxProductFound, 1)
    await saveProducts()
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
        throw new Error ("Product was not found!")
    } else {
        return productsFound
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
        throw new Error ("Product was not found!")
    } else {
        return productsFound
    }
}


async function saveProducts() {
    await fs.writeFile("data/products.json", JSON.stringify(products))
}

async function loadProducts() {
    products = JSON.parse(await fs.readFile("data/products.json", "utf-8"))
}

async function existsJSONFile() {
    let fileExists
    await fs.access("data/products.json", fs.constants.F_OK)
        .then(() => {
            console.info("File exists.")
            fileExists = true
        })
        .catch((err) => {
            console.error("File does not exists.", err)
            fileExists = false
        })
    return fileExists
}

//-- Helper functions for generating product details --

// Generate and add random products
async function generateProducts(num) {
    let maxlength = productsData.maxInitialProducts
    for (let i=0; i<Math.min(num, maxlength); i++) {
        const productId = generateUId()
        const productName = generateProductName(productsData.productNames)
        const productOwnerName = generateProductOwner(productsData.productOwnerNames)
        const Developers = generateDevelopers(productsData.developers, 1, 5)
        const scrumMasterName = generateScrumMaster(productsData.scrumMasterNames)
        const startDate = generateDate(new Date(2023, 3, 31), -365)
        const methodology = generateMethodology(productsData.methodologies)

        const p = {
            productId,
            productName,
            productOwnerName,
            Developers,
            scrumMasterName,
            startDate,
            methodology
        }

        if (validateProduct(p)) {
            products.push(p)
            await saveProducts()
        }
    }
}

function generateUId() {
    let pId = ""
    // generate new product ID until it doesn't collide with previously generated product IDs
    do {
        pId = "P"+(Math.random().toString(36).substr(2,5))
    } while (products.find((product) => product.productId === pId))

    return pId
}

// Generate random product name that is not previously included in the list of products
function generateProductName(arrProductNames) {
    let selectedProductName = ""
    // generate new product name until it is a product name not previously included in the list of products
    do {
        selectedProductName = arrProductNames[getRandomInt(0, arrProductNames.length)]
    } while (products.find((product) => product.productName === selectedProductName)) // ensure automatic generated product name is unique
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
        } while (newArrDevelopers.includes(selectedDeveloper))
        newArrDevelopers.push(selectedDeveloper)
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
    return Math.floor(Math.random() * (max - min) + min)
}

function validateProduct(product) {
    if (!product.productId) {
        throw new Error ("Product ID was missing!")
    } else if (!product.productName) {
        throw new Error ("Product name was missing!")
    } else if (!product.productOwnerName) {
        throw new Error ("Owner name was missing!")
    } else if (!Array.isArray(product.Developers) || !product.Developers.filter(n => n).length) {
        throw new Error ("Developers is not an array, or is an empty array!!")
    } else if (!product.scrumMasterName) {
        throw new Error ("Scrum master name was missing!")
    } else if (!product.startDate) {
        throw new Error ("Start date was missing!")
    } else if (!product.methodology) {
        throw new Error ("Methodology was missing!")
    } else {
        return true
    }
}
