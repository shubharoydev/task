const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Registration=require('../models/Registration');

exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, isAdmin: true });

    if (!user) {
      console.log("Email:", email);
console.log("Password:", password);
console.log("User found:", user);

      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Email:", email);
console.log("Password:", password);
console.log("User found:", user);

      return res.status(401).json({ message: 'Invalid credentials' });
      
    }

    const token = jwt.sign({ id: user._id, isAdmin: true }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

exports.getRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find().populate('user event team');
    res.json(registrations);
  } catch (error) {
    next(error);
  }
};