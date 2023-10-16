/**
 * @swagger
 * components:
 *   schemas:
 *     product:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: unique product ID
 *           example: Plfun9
 *         productName:
 *           type: string
 *           description: name of the product
 *           example: Child Care Web Application
 *         productOwnerName:
 *           type: string
 *           description: name of the product owner
 *           example: Karen Hensley
 *         Developers:
 *           type: array of string
 *           description: name of the developers (up to 5)
 *           example: ["Jack Mundy", "Owen Russell", "Blake Salazar", "Arthur Riches", "Margaret McGowen"]
 *         scrumMasterName:
 *           type: string
 *           description: name of the scrum master
 *           example: Aidan McGhie
 *         startDate:
 *           type: string
 *           description: the date the project started
 *           example: 2023/02/18
 *         methodology:
 *           type: string
 *           description: methodology used for the project (Agile or Waterfall)
 *           example: Agile
 * paths:
 *   /api/product:
 *     get:
 *       tags:
 *         - product
 *       summary: Finds all products
 *       description: Finds all products.  No value needs to be provided
 *       operationId: getAllProducts
 *       responses:
 *         '200':
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *               type: array of objects
 *               items:
 *                 $ref: '#/components/schemas/product'
 *         '400':
 *           description: Unable to get data
 *     post:
 *       tags:
 *         - product
 *       summary: Create new product
 *       description:
 *         Create new product, and return all products after new product is created.
 *         Please note that the "productId" key-value pair in productData provided as parameter is not needed and will be ignored.
 *         An unique productId will be automatically generated.
 *       operationId: addProducts
 *       parameters:
 *         - name: productData
 *           in: query
 *           description: New product object that needs to be added to list of products
 *           required: true
 *           explode: false
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/product'
 *       requestBody:
 *         description: Create a new product in the list of products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/product'
 *         required: true
 *       responses:
 *         '200':
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *               type: array of objects
 *               items:
 *                 $ref: '#/components/schemas/product'
 *         '400':
 *           description: Unable to add new data
 *   /api/product/:productId:
 *     put:
 *       tags:
 *         - product
 *       summary: Update an existing product
 *       description:
 *         Update a product with a specific product ID.
 *         To successfully update an existing product data, the product ID included in provided product data needs to be the same as product ID in an existing product.
 *         To try this function out and receive a sucessful response, execute the function in the GET function above, copy one of the product ID in the generated product, and paste the product ID into the value fo the key "productID" in the Example Value under Request Body below.
 *         An error will be responded if the value for the key "productId" does not belong to an existing product
 *       operationId: editProducts
 *       parameters:
 *         - name: productData
 *           in: query
 *           description: Product object with new details that an existing product will be updated to
 *           required: true
 *           explode: true
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/product'
 *       requestBody:
 *         description: Update an existing product with provided product ID to provided product data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/product'
 *         required: true
 *       responses:
 *         '200':
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *               type: array of objects
 *               items:
 *                 $ref: '#/components/schemas/product'
 *         '400':
 *           description: Unable to update data or find existing product with product ID included in the provided product data
 *   /api/product/findByScrumMasterName:
 *     post:
 *       tags:
 *         - product
 *       summary: Find products with a specific Scrum Master Name
 *       description: 
 *         Find products with a specific Scrum Master Name.
 *         To try this function out and receive response other than an empty array, execute the function in the GET function above, copy one of the scrum master names in the generated products, and paste the scrum master name into the value of the key "scrumMasterName" in the Example Value under Request Body below.
 *       operationId: findProductsByScrumMasterName
 *       parameters:
 *         - name: scrumMasterNameData
 *           in: query
 *           description: Scrum Master Name of products that need to be found
 *           required: true
 *           explode: true
 *           schema:
 *             type: object
 *             example: { "scrumMasterName": "Aidan McGhie" }
 *       requestBody:
 *         description: Scrum Master Name of products that need to be found
 *         content:
 *           application/json:
 *             schema:
 *               example: { "scrumMasterName": "Aidan McGhie" }
 *         required: true
 *       responses:
 *         '200':
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *               type: array of objects
 *               items:
 *                 $ref: '#/components/schemas/product'          
 *         '400':
 *           description: Error in finding products with specific scrum master name
 *   /api/product/findByDeveloperName:
 *     post:
 *       tags:
 *         - product
 *       summary: Find products with a specific Developer Name
 *       description: 
 *         Find products with a specific Developer Name.
 *         To try this function out and receive response other than an empty array, execute the function in the GET function above, copy one of the developer names in the generated products, and paste the developer name into the value of the key "developerName" in the Example Value under Request Body below.
 *       operationId: findProductsByDeveloperName
 *       parameters:
 *         - name: developerNameData
 *           in: query
 *           description: Developer Name of products that need to be found
 *           required: true
 *           explode: true
 *           schema:
 *             type: object
 *             example: { "developerName": "Margaret McGowen" }
 *       requestBody:
 *         description: Developer Name of products that need to be found
 *         content:
 *           application/json:
 *             schema:
 *               example: { "developerName": "Margaret McGowen" }
 *         required: true
 *       responses:
 *         '200':
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *               type: array of objects
 *               items:
 *                 $ref: '#/components/schemas/product'          
 *         '400':
 *           description: Error in finding products with specific developer name
 */

const express = require("express")
const router = express.Router()
const productsCtrl = require("../../controllers/products")

// GET /api/product
router.get("/", productsCtrl.index)

// POST /api/product
router.post("/", productsCtrl.addProduct)

// PUT /api/product/:productId
router.put("/:productId", productsCtrl.updateProduct)

// POST /api/product/findByScrumMasterName
router.post('/findByScrumMasterName', productsCtrl.findProductsByScrumMasterName)

// POST /api/product/findByScrumMasterName
router.post('/findByDeveloperName', productsCtrl.findProductsByDeveloperName)

module.exports = router;

