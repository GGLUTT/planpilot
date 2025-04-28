require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const { Telegraf } = require('telegraf');
const { User } = require('../models/user');
const { Goal } = require('../models/goal');

// Initialize Express app
const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'PlanPilot API is working!' });
});

// Initialize Telegram bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// API routes
app.use('/users', require('../routes/users'));
app.use('/goals', require('../routes/goals'));

// Bot commands
bot.command('start', async (ctx) => {
  try {
    const telegramId = ctx.from.id.toString();
    let user = await User.findOne({ telegramId });
    
    if (!user) {
      const userId = generateRandomId(8);
      user = await User.create({
        telegramId,
        userId,
        username: ctx.from.username || 'Anonymous',
        firstName: ctx.from.first_name,
        lastName: ctx.from.last_name,
        photoUrl: null
      });
    }
    
    // Determine which URL to use for the Mini App
    // Priority: 1. WEBAPP_URL env var, 2. Default Netlify URL, 3. GitHub Pages URL if available
    const miniAppUrl = process.env.WEBAPP_URL || 
                       'https://planpilot.netlify.app';
    
    await ctx.reply(
      `Welcome to PlanPilot, ${user.firstName}! 🚀\n\nYour personal ID: ${user.userId}\n\nUse the menu below to manage your goals and plans:`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Open Mini App', web_app: { url: miniAppUrl } }]
          ]
        }
      }
    );
  } catch (error) {
    console.error('Error in start command:', error);
    ctx.reply('Sorry, something went wrong. Please try again later.');
  }
});

// Generate random ID
function generateRandomId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Start bot
if (process.env.NODE_ENV !== 'development') {
  bot.launch().then(() => {
    console.log('Bot started successfully');
  }).catch(err => {
    console.error('Error starting bot:', err);
  });
}

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Wrap Express app for serverless function
module.exports.handler = serverless(app); 