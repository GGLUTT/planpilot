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
- Glitch (hosting)

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

### Installation

1. Clone the repository:
```bash
git clone https://github.com/GGLUTT/planpilot.git
cd planpilot
```

2. Install all dependencies:
```bash
npm run install-all
```

3. Create a `.env` file in the root directory with the following:
```
BOT_TOKEN=your_telegram_bot_token
MONGODB_URI=mongodb://localhost:27017/planpilot
WEBAPP_URL=https://cypress-pie-account.glitch.me
```

### Running the Application Locally

**Option 1: Full Stack Development**
```bash
npm run dev
```

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

## Deployment to Glitch

See [GLITCH_SETUP.md](GLITCH_SETUP.md) for detailed instructions on deploying to Glitch.

The application is currently deployed at: https://cypress-pie-account.glitch.me

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
│   ├── models/             # Mongoose models
│   ├── routes/             # Express routes
│   ├── data/               # Local data storage
│   ├── index.js            # Server entry point
│   └── package.json
├── package.json            # Root package.json for Glitch
└── README.md
```

## License

MIT 