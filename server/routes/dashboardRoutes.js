const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// @route   GET /api/dashboard/admin
// @desc    Get metrics & alerts for Admin Dashboard
// @access  Private (Admin only)
router.get(
  '/admin',
  authMiddleware,
  roleMiddleware('admin'),
  dashboardController.getAdminDashboard
);

// @route   GET /api/dashboard/user
// @desc    Get active rentals & history for User Dashboard
// @access  Private (Client, Vendor, Admin)
router.get(
  '/user',
  authMiddleware,
  dashboardController.getUserDashboard
);

module.exports = router;