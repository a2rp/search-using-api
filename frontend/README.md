# Search Using API frontend

React client for the Search Using API demo, built with Vite.

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` if the API is not at `http://localhost:1198/api`.
3. Run `npm run start` and open the local URL printed by Vite.

The matching Express API and demo credentials are documented in the repository root README. The client is configured for the GitHub Pages path `/search-using-api/`; set a deployed API URL in `VITE_API_BASE_URL` when building for production.

## Commands

- `npm run start` starts the Vite development server.
- `npm run build` creates the production build in `dist/`.
- `npm run preview` serves that build locally.
- `npm run lint` runs ESLint on the application source.
