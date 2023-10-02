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
 *         To try this function out and receive a sucessful response, execute the function in the GET function above, copy one of the product ID in the generated product, paste the product ID into the value fo the key "productID" in the Example Value under Request Body below.
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

module.exports = router
