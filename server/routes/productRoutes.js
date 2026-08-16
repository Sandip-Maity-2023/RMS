const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// @route   GET /api/products
// @desc    Get list of products (with category/search query support)
// @access  Public
router.get('/', productController.getAllProducts);

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', productController.getProductById);

// @route   POST /api/products
// @desc    Create a new product
// @access  Private (Admin & Vendor only)
router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin', 'vendor'),
  productController.createProduct
);

// @route   PUT /api/products/:id
// @desc    Update an existing product
// @access  Private (Admin & Vendor only)
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'vendor'),
  productController.updateProduct
);

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private (Admin & Vendor only)
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin', 'vendor'),
  productController.deleteProduct
);

module.exports = router;
