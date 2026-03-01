# Whoowhoo Travels Backend

Node.js Express + MongoDB backend with MVP architecture.

## Setup

1. Copy env and install deps:

   ```bash
   cp .env.example .env
   npm install
   ```

2. Ensure MongoDB is running locally (or set `MONGODB_URI` in `.env`).

## Run

- **Start:** `npm start`
- **Dev (with watch):** `npm run dev`

Server runs at `http://localhost:3000` (or `PORT` from `.env`).

## Test route

- **GET** `/api/health` – Returns a simple JSON health check.

Example:

```bash
curl http://localhost:3000/api/health
```

## Project structure (MVP)

```
src/
  config/       # env, database connection
  controllers/  # request handlers
  routes/       # route definitions
  app.js        # Express app
  server.js     # entry point
```

Add new features by adding routes under `src/routes/`, controllers under `src/controllers/`, and (optional) models under `src/models/` when you need MongoDB schemas.
