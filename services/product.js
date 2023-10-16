const fs = require("node:fs/promises")

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

//-- Helper functions for generating product details --

function generateUId() {
    let pId = ""
    // generate new product ID until it doesn't collide with previously generated product IDs
    do {
        pId = "P"+(Math.random().toString(36).substr(2,5))
    } while (products.find((product) => product.productId === pId))

    return pId
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
