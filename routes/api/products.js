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
