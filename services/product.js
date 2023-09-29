const fs = require('node:fs/promises')

module.exports = {
    getAll, 
    getById, 
    update, 
    create
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
    
    console.log("update: products", products)
    await saveProducts()
}

async function create(product) { 
        const id = generateUId()
        const productName = product.productName ? product.productName : ""
        const productOwnerName = product.productOwnerName ? product.productOwnerName : ""
        const developers = product.Developers ? product.Developers : []
        const scrumMasterName = product.scrumMasterName ? product.scrumMasterName : ""
        const startDate = product.startDate ? product.startDate : ""
        const methodology = product.methodology ? product.methodology : ""

        const newProduct = createProduct(
            id, 
            productName, 
            productOwnerName, 
            developers, 
            scrumMasterName, 
            startDate, 
            methodology
        )
        products.push(newProduct)
        console.log("newProduct: products", products)
        console.log("create: products", products)

        await saveProducts()

    // try {
    //     const id = generateUId()
    //     const productName = req.body.productName ? req.body.productName : ""
    //     const productOwnerName = req.body.productOwnerName ? req.body.productOwnerName : ""
    //     const developers = req.body.Developers ? req.body.Developers : []
    //     const scrumMasterName = req.body.scrumMasterName ? req.body.scrumMasterName : ""
    //     const startDate = req.body.startDate ? req.body.startDate : ""
    //     const methodology = req.body.methodology ? req.body.methodology : ""
            
    //     const newProduct = createProduct(
    //         id, 
    //         productName, 
    //         productOwnerName, 
    //         developers, 
    //         scrumMasterName, 
    //         startDate, 
    //         methodology
    //     )
    
    //     productsData.allProducts.push(newProduct)
    //     res.status(200).json(productsData.allProducts)
    // } catch {
    //     res.status(400).json(err)
    // }
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
    } while (products.reduce( (acc, product) => acc || (product.productId === pId), false)); 
    
    console.log("pId:", pId)
    return pId

    // let pId = ""
    // // generate new product ID until it doesn't collide with previously generated product IDs
    // do {
    //     pId = "P"+(Math.random().toString(36).substr(2,5));
    // } while (productsData.allProducts.reduce( (acc, product) => acc || (product.productName === pId), false)); 
    // return pId
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


