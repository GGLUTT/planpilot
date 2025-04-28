const express = require('express');
const router = express.Router();
const { Goal } = require('../models/goal');
const { User } = require('../models/user');

// Get all goals for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const goals = await Goal.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a specific goal
router.get('/:goalId', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.goalId);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    
    res.json(goal);
  } catch (error) {
    console.error('Error fetching goal:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new goal
router.post('/', async (req, res) => {
  try {
    const { userId, title, description, deadline, priority, tasks } = req.body;
    
    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const goal = new Goal({
      userId,
      title,
      description,
      deadline,
      priority,
      tasks: tasks || []
    });
    
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a goal
router.put('/:goalId', async (req, res) => {
  try {
    const { title, description, deadline, status, priority, tasks } = req.body;
    
    const goal = await Goal.findByIdAndUpdate(
      req.params.goalId,
      { 
        $set: { 
          title, 
          description, 
          deadline, 
          status, 
          priority,
          tasks
        } 
      },
      { new: true }
    );
    
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    
    res.json(goal);
  } catch (error) {
    console.error('Error updating goal:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a goal
router.delete('/:goalId', async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.goalId);
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    
    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Error deleting goal:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a task to a goal
router.post('/:goalId/tasks', async (req, res) => {
  try {
    const { title } = req.body;
    
    const goal = await Goal.findByIdAndUpdate(
      req.params.goalId,
      { $push: { tasks: { title, completed: false } } },
      { new: true }
    );
    
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    
    res.json(goal);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a task
router.put('/:goalId/tasks/:taskId', async (req, res) => {
  try {
    const { title, completed } = req.body;
    
    const goal = await Goal.findOneAndUpdate(
      { 
        _id: req.params.goalId,
        'tasks._id': req.params.taskId 
      },
      { 
        $set: { 
          'tasks.$.title': title,
          'tasks.$.completed': completed 
        } 
      },
      { new: true }
    );
    
    if (!goal) return res.status(404).json({ message: 'Goal or task not found' });
    
    res.json(goal);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a task
router.delete('/:goalId/tasks/:taskId', async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.goalId,
      { $pull: { tasks: { _id: req.params.taskId } } },
      { new: true }
    );
    
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    
    res.json(goal);
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router; 