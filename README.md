# AAF Reporting

A full-stack reporting application for OpenText Advanced Authentication (AAF). The project contains a React frontend and an Express backend that proxies requests to the AAF REST API.

## Prerequisites

- Docker
- Docker Compose

## Project structure

- `/frontend` – React (Vite) UI for login, dashboard, and reports
- `/backend` – Express middleware for AAF authentication and reporting endpoints
- `/docker-compose.yml` – local orchestration for frontend and backend containers

## Configure environment

1. Copy the template:

   ```bash
   cp .env.example .env
   ```

2. Update `.env` values with your AAF server URL and credentials.

## Run with Docker Compose

```bash
docker-compose up --build
```

Services:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## OpenText AAF API integration notes

- Backend reads AAF credentials and URLs from environment variables.
- `backend/src/services/aafClient.js` handles token acquisition and API requests.
- Routes:
  - `POST /api/auth/login`
  - `GET /api/reports/events`
  - `GET /api/reports/users`
  - `GET /api/reports/policies`
  - `GET /api/reports/audit-logs`
- Backend returns structured error payloads when upstream AAF requests fail.
