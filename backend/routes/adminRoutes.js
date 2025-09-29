const express = require('express');
const router = express.Router();
const { loginAdmin, getRegistrations } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.get('/registrations', protect, getRegistrations);

module.exports = router;