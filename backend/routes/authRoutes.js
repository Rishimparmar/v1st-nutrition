const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@v1stnutrition.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'V1st@Surat2026';
const JWT_SECRET = process.env.JWT_SECRET || 'v1st_nutrition_secret_jwt_key_surat_2026';

// @route   POST /api/auth/login
// @desc    Admin login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { email: ADMIN_EMAIL, role: 'admin', store: 'V1st Nutrition Surat' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Admin authentication successful',
      token,
      user: {
        email: ADMIN_EMAIL,
        name: 'Store Manager',
        storeLocation: 'Velanja Rd, Surat, Gujarat',
        role: 'admin',
      },
    });
  }

  return res.status(401).json({ message: 'Invalid admin credentials' });
});

// @route   GET /api/auth/verify
// @desc    Verify current admin token
router.get('/verify', authMiddleware, (req, res) => {
  res.json({
    valid: true,
    user: req.user,
  });
});

module.exports = router;
