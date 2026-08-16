const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Resend } = require('resend');


// Initialize Resend with API Key from environment variables
const resend = new Resend(process.env.RESEND_API);

// Password Validation Rule: 6-12 chars, 1 Upper, 1 Lower, 1 Special (@, $, &, _)
const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$&_]).{6,12}$/;
  return regex.test(password);
};

// 1. User Sign-Up
exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and Confirm Password must match.' });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({
        message: 'Password must be 6-12 characters long and include at least one uppercase letter, one lowercase letter, and one special character (@, $, &, _).'
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email ID must be unique.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'client'
    });

    await newUser.save();

    res.status(201).json({
      message: 'Registration successful!',
      couponCode: 'xxxx10' // Displayed upon successful signup
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Vendor Sign-Up
exports.registerVendor = async (req, res) => {
  const { firstName, lastName, companyName, productCategory, gstNo, email, password, confirmPassword } = req.body;

  try {
    if (!productCategory) {
      return res.status(400).json({ message: 'Product Category selection is mandatory.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password and Confirm Password must match.' });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({
        message: 'Password must be 6-12 characters long and include at least one uppercase letter, one lowercase letter, and one special character (@, $, &, _).'
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email ID must be unique.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newVendor = new User({
      firstName,
      lastName,
      companyName,
      productCategory,
      gstNo,
      email,
      password: hashedPassword,
      role: 'vendor'
    });

    await newVendor.save();

    res.status(201).json({
      message: 'Vendor registered successfully!',
      couponCode: 'xxxx10'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Login
exports.login = async (req, res) => {
  const { loginId, password } = req.body;

  try {
    const user = await User.findOne({ email: loginId });
    if (!user) {
      return res.status(400).json({ message: 'Invalid User ID or Password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid User ID or Password.' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`.trim(),
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4. Reset Password using Resend API
exports.resetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found.' });
    }

    // Generate reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '15m' });
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const resetUrl = `${clientUrl}/update-password?token=${resetToken}`;

    // Send email using Resend
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Use verified domain in production
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>This link will expire in 15 minutes.</p>`
    });

    res.json({ message: 'The password reset link has been sent to your email.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send reset email via Resend API.', error: err.message });
  }
};

