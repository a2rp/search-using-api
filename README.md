# Search Using API

A small full-stack demo for searching TV shows. The React client signs in through an Express API, then requests results from TVMaze using a short-lived JWT.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

1. In a terminal, install the API dependencies:
   ```sh
   cd backend
   npm install
   ```
2. Copy `backend/.env.example` to `backend/.env` with your file manager or shell.
3. Generate a signing key and set it as `TOKEN_KEY` in `backend/.env`:
   ```sh
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
4. Start the API with `npm run dev`. It listens on `http://localhost:1198` by default.
5. In another terminal, install the client dependencies:
   ```sh
   cd frontend
   npm install
   ```
6. Copy `frontend/.env.example` to `frontend/.env`, then run `npm run start`.
7. Open the Vite URL printed in the terminal (normally `http://localhost:5173`).

The API allows the local Vite origin by default. Set `CLIENT_ORIGINS` in `backend/.env` to a comma-separated list when using another client origin. Set `VITE_API_BASE_URL` in `frontend/.env` if the API is hosted elsewhere.

## Demo login

| Email | Password |
| --- | --- |
| `user1@mail.com` | `password1` |
| `user2@mail.com` | `password2` |
| `user3@mail.com` | `password3` |

These public sample credentials are stored as bcrypt hashes in the server code. They are only for this demonstration; the project does not include a user database or production account management.

## API routes

- `GET /api/health` reports whether the server is ready.
- `POST /api/login` accepts `{ "email": "...", "password": "..." }` and returns a two-hour bearer token.
- `GET /api/search?title=...` requires `Authorization: Bearer <token>` and returns matching TVMaze shows.

## Build and deployment

Run `npm run build` inside `frontend` to create a production build. Vite is configured for the GitHub Pages project path `/search-using-api/`. Set `VITE_API_BASE_URL` to a deployed API URL at build time; the local API URL is for development only. The backend must be hosted separately because GitHub Pages serves static files.

## Data source

Show details are provided by [TVMaze](https://www.tvmaze.com/api).
