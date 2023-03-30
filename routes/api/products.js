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
 *           example: lfun9l3fb5iz7clevx
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
 *       parameters:
 *         - name: status
 *           in: query
 *           description: Status values that need to be considered for filter
 *           required: false
 *           explode: true
 *           schema:
 *             type: string
 *             default: available
 *             enum:
 *               - available
 *               - pending
 *               - sold
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
 *       summary: Finds all products
 *       description: Finds all products.  No value needs to be provided
 *       operationId: getAllProducts
 *       parameters:
 *         - name: status
 *           in: query
 *           description: Status values that need to be considered for filter
 *           required: false
 *           explode: true
 *           schema:
 *             type: string
 *             default: available
 *             enum:
 *               - available
 *               - pending
 *               - sold
 *       requestBody:
 *         description: Create a new pet in the store
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/product'
 *           application/xml:
 *             schema:
 *             $ref: '#/components/schemas/product'
 *           application/x-www-form-urlencoded:
 *             schema:
 *             $ref: '#/components/schemas/product'
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
 *           description: Unable to get data
 *   /api/product/:productId:
 *     put:
 *       tags:
 *         - product
 *       summary: Finds all products
 *       description: Finds all products.  No value needs to be provided
 *       operationId: getAllProducts
 *       parameters:
 *         - name: status
 *           in: query
 *           description: Status values that need to be considered for filter
 *           required: false
 *           explode: true
 *           schema:
 *             type: string
 *             default: available
 *             enum:
 *               - available
 *               - pending
 *               - sold
 *       requestBody:
 *         description: Create a new pet in the store
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/product'
 *           application/xml:
 *             schema:
 *             $ref: '#/components/schemas/product'
 *           application/x-www-form-urlencoded:
 *             schema:
 *             $ref: '#/components/schemas/product'
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
 *           description: Unable to get data
 */

const express = require('express');
const router = express.Router();
const productsCtrl = require('../../controllers/products');

console.log("inside router")

// GET /api/product
router.get('/', productsCtrl.index);

// POST /api/product
router.post('/', productsCtrl.addProduct)

// PUT /api/product/:productId
router.put('/:productId', productsCtrl.updateProduct)

module.exports = router;
