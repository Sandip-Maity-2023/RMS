const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// @route   POST /api/rentals
// @desc    Create a new rental order / quotation
// @access  Private (Authenticated Users)
router.post(
  '/',
  authMiddleware,
  rentalController.createRentalOrder
);

// @route   GET /api/rentals/my-rentals
// @desc    Get current user's rental history & active orders
// @access  Private (Authenticated Users)
router.get(
  '/my-rentals',
  authMiddleware,
  rentalController.getUserRentals
);

// @route   POST /api/rentals/return/:orderId
// @desc    Process item return, calculate late penalty, and settle deposit
// @access  Private (Admin & Vendor only)
router.post(
  '/return/:orderId',
  authMiddleware,
  roleMiddleware('admin', 'vendor'),
  rentalController.processReturn
);

module.exports = router;