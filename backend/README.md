# Search Using API backend

Express API for the Search Using API demo. It issues short-lived JWTs for three public demo accounts and proxies show searches to TVMaze. User accounts are static; no production user database is included.

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env`.
3. Generate a signing key with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` and set it as `TOKEN_KEY` in `.env`.
4. Keep `CLIENT_ORIGINS` set to the frontend origin. The default Vite development origin is `http://localhost:5173`.
5. Start the API with `npm run dev`.

The API listens on port `1198` by default. `GET /api/health` checks that it is running. `POST /api/login` accepts JSON credentials. `GET /api/search?title=...` requires an `Authorization: Bearer <token>` header.

The demo passwords are public and are only for local demonstration. Replace the static accounts and add persistent user management before using this API for real users.
