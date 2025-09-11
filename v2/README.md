# Prompty v2

A collaborative prompting game for reducing group bias and encouraging authentic responses.

## What is Prompty?

Prompty is a simple web app that lets you create prompts and share them with others. The key mechanism: **you can only see other people's responses after you've submitted your own**. This reduces group bias and encourages more authentic, thoughtful responses.

## Features

- 🔐 Simple email/password authentication
- ✍️ Create prompts with customizable character limits
- ⏰ Time-limited prompts that expire
- 👁️ Responses revealed only after participation
- 🔗 Share prompts via unlisted links
- 📊 Track response counts

## Tech Stack

- **Runtime**: Bun (fast JavaScript runtime with built-in SQLite)
- **Backend**: Hono (lightweight web framework)
- **Database**: SQLite (embedded)
- **Frontend**: React + Vite + React Router
- **Auth**: JWT tokens with bcrypt

## Quick Start

### Prerequisites

- [Bun](https://bun.sh) v1.2+ installed

### Development

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Or run server and client separately
bun server/index.ts        # API on :3000
bunx --bun vite           # Frontend on :5173
```

### Production

```bash
# Build frontend
bun run build

# Run production server (serves API + static files)
bun run start:prod
```

## Environment Variables

Create a `.env` file:

```env
DATABASE_PATH=./prompty.db
JWT_SECRET=change-this-in-production
PORT=3000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Prompts
- `POST /api/prompts` - Create prompt (auth required)
- `GET /api/prompts` - List user's prompts (auth required)
- `GET /api/prompts/:id` - Get prompt (reveals responses if participated)
- `POST /api/prompts/:id/respond` - Submit response (auth required)

## Database Schema

```sql
users
├── id (autoincrement)
├── email (unique)
├── password (hashed)
└── username

prompts
├── id (random hex)
├── user_id (FK)
├── title, description
├── min_length, max_length
└── expires_at

responses
├── id
├── prompt_id (FK)
├── user_id (FK)
├── response
└── UNIQUE(prompt_id, user_id)
```

## Docker Deployment

```bash
# Build and run with Docker
docker compose up

# Or deploy to Coolify/Railway/Render
# Uses included Dockerfile
```

## The Core Mechanism

The reveal logic that makes Prompty special:

1. User visits a prompt link
2. If they haven't responded:
   - Shows the prompt and response form
   - Displays count of hidden responses
   - Other responses remain hidden
3. Once they respond:
   - All responses become visible
   - Response form disappears
   - Can't submit another response

This encourages authentic responses by preventing anchoring bias and groupthink.

## Architecture

```
/src
├── /pages          # React pages
├── /components     # Reusable components
├── /context        # Auth context
└── main.tsx        # Entry point

/server
├── db.ts           # Database models
├── index.ts        # Development server
└── prod.ts         # Production server
```

## Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens expire after 7 days
- Prepared statements prevent SQL injection
- UNIQUE constraints prevent duplicate responses
- Expired prompts return 410 Gone

## Why Bun + SQLite?

- **Simple**: Single runtime, no separate database server
- **Fast**: Bun is incredibly fast, SQLite is perfect for this use case
- **Portable**: Single binary + database file
- **Scalable enough**: Handles thousands of users easily
- **Developer friendly**: Great DX with built-in TypeScript, testing, etc.

## License

MIT