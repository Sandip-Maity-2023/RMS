const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST /api/auth/register-user
// @desc    Register a new client user
// @access  Public
router.post('/register-user', authController.registerUser);

// @route   POST /api/auth/register-vendor
// @desc    Register a new vendor
// @access  Public
router.post('/register-vendor', authController.registerVendor);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authController.login);

// @route   POST /api/auth/reset-password
// @desc    Send password reset email via Resend
// @access  Public
router.post('/reset-password', authController.resetPassword);

module.exports = router;
