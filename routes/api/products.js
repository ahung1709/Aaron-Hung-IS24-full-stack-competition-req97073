const express = require('express');
const router = express.Router();
const productsCtrl = require('../../controllers/products');

console.log("inside router")

// GET /api/products
router.get('/', productsCtrl.index);

router.get('/prepopulate', productsCtrl.prepopulate);

// POST /api/product
router.post('/', productsCtrl.addProduct)

// PUT /api/product/:productId
router.put('/:productId', productsCtrl.updateProduct)

// DELETE /api/product/:productId
// router.delete('/:productId', productsCtrl.delete)

module.exports = router;
