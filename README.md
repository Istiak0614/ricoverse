# RICOVERSE — Clothing E-commerce

Full-stack store built with **React + Vite + TypeScript** (client) and **Express + MongoDB + TypeScript** (server).

| Role | Member | GitHub |
| --- | --- | --- |
| Integration / team lead | Istiak | [@Istiak0614](https://github.com/Istiak0614) |
| Backend | Sabbir | [@Sabbir3049](https://github.com/Sabbir3049) |
| Frontend / UI | Jawadul | [@jawadulhasan730](https://github.com/jawadulhasan730) |

## Run locally

Requirements: Node 22+, npm 10+, a MongoDB Atlas connection string.

```bash
# 1. API
cd server
cp .env.example .env      # then fill in DATABASE_URL
npm install
npm run dev               # http://localhost:5000/api/v1/health

# 2. Web (new terminal)
cd client
cp .env.example .env
npm install
npm run dev               # http://localhost:5173
```

## Branches

- `main` — production (deployed)
- `develop` — team integration branch
- `feature/WEB-xx-short-name` — one Jira story each

Commit style: `feat(scope): message [WEB-xx]`

## Folder map

```
client/   React app      (src/api, hooks, store, routes, components, layouts, pages, ...)
server/   Express API    (src/config, middlewares, utils, routes, modules/<name>/...)
docs/     API contract and team docs
```
