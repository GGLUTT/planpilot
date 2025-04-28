const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

// Get user profile by userId
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json({
      userId: user.userId,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user profile
router.put('/:userId', async (req, res) => {
  try {
    const { username, photoUrl } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: { username, photoUrl } },
      { new: true }
    );
    
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    
    res.json({
      userId: updatedUser.userId,
      username: updatedUser.username,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      photoUrl: updatedUser.photoUrl
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router; 