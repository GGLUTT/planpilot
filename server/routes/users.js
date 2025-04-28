const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { userId, username, firstName, lastName, photoUrl } = req.body;
    
    // Check if user with this ID already exists
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this ID already exists' });
    }
    
    // Create new user
    const newUser = await User.create({
      userId,
      username,
      firstName,
      lastName,
      photoUrl,
      telegramId: req.body.telegramId || null,
      createdAt: new Date().toISOString()
    });
    
    res.status(201).json({
      userId: newUser.userId,
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      photoUrl: newUser.photoUrl
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

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
      { $set: { username, photoUrl, updatedAt: new Date().toISOString() } },
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