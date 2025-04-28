# PlanPilot - Telegram Bot with Mini App

PlanPilot is a Telegram bot with an integrated Mini App that helps users manage their goals and plans with an interactive interface.

## Features

- Create, update, and track personal goals
- Add tasks to each goal and mark them as completed
- Track overall progress
- User profiles with unique IDs
- Beautiful UI with animations

## Tech Stack

### Server
- Node.js
- Express.js
- MongoDB (mongoose)
- Telegraf (Telegram Bot API)
- Netlify Functions (serverless)

### Client
- React
- TypeScript
- Styled Components
- Framer Motion (for animations)
- React Router
- Vite

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- Telegram Bot Token
- Netlify CLI (for local development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/GGLUTT/planpilot.git
cd planpilot
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

4. Create a `.env` file in the root directory with the following:
```
BOT_TOKEN=your_telegram_bot_token
MONGODB_URI=mongodb://localhost:27017/planpilot
WEBAPP_URL=https://planpilot.netlify.app
```

### Running the Application Locally

**Option 1: Using Netlify Dev (Recommended)**
```bash
cd client
npm run netlify:dev
```

This will run both the client and serverless functions.

**Option 2: Separate Development**
1. Start the server:
```bash
cd server
npm run dev
```

2. Start the client:
```bash
cd client
npm run dev
```

3. Access the Mini App through your Telegram bot or directly via the browser at `http://localhost:5173`.

## Deployment to Netlify

See [NETLIFY_SETUP.md](NETLIFY_SETUP.md) for detailed instructions on deploying to Netlify.

## Bot Commands

- `/start` - Start the bot and get your user ID
- `/help` - Get help using the bot

## Project Structure

```
planpilot/
├── client/                 # React front-end
│   ├── public/
│   ├── src/
│   │   ├── api/            # API client
│   │   ├── components/     # React components
│   │   ├── context/        # React context providers
│   │   ├── pages/          # Page components
│   │   ├── styles/         # Styled components and global styles
│   │   └── types/          # TypeScript types
│   └── package.json
├── server/                 # Node.js back-end
│   ├── functions/          # Netlify serverless functions
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── index.js            # Server entry point
│   └── package.json
├── netlify.toml            # Netlify configuration
└── README.md
```

## License

MIT 