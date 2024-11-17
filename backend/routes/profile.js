const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('booksOwned');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/:userId', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
