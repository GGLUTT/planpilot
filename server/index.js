require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Telegraf } = require('telegraf');
const { User } = require('./models/user');
const { Goal } = require('./models/goal');
const fs = require('fs');
const path = require('path');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize Express app
const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Set up CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'PlanPilot API is working!' });
});

// Initialize Telegram bot
const bot = new Telegraf(process.env.BOT_TOKEN);

// API routes
app.use('/api/users', require('./routes/users'));
app.use('/api/goals', require('./routes/goals'));

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
    
    await ctx.reply(
      `Welcome to PlanPilot, ${user.firstName}! 🚀\n\nYour personal ID: ${user.userId}\n\nUse the menu below to manage your goals and plans:`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: '📱 Open Mini App', web_app: { url: `https://fa1ead7f984f3bee33c0a4bb630c15cc.serveo.net` } }]
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

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Start bot
bot.launch().then(() => {
  console.log('Bot started successfully');
}).catch(err => {
  console.error('Error starting bot:', err);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM')); 