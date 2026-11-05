# Ireel

Short video sharing app. Abhi ka scope: app structure, video watching, watch progress (Continue Watching), Saved Collections, Dark/Light mode.

Monetization aur extra features baad ke phase me.

## Stack

- Frontend: React + Vite + React Router
- Backend: Node.js + Express
- Storage (abhi): in-memory store + local `backend/media/` folder
- Storage (production): PostgreSQL (planned)

## Setup

```bash
# Backend
cd backend
npm install
cp ../.env.example .env
npm run dev          # http://localhost:4000

# Frontend (naya terminal)
cd frontend
npm install
npm run dev          # http://localhost:5173
```

Test ke liye koi bhi MP4 file `backend/media/sample.mp4` ke naam se rakh dijiye.

## Folder structure

```
backend/   API server (videos streaming, library, watch progress)
frontend/  User app (Home, Watch, Saved, Settings)
shared/    Frontend aur backend dono ke common constants
docs/      Feature list aur architecture notes
```

## Status

- [x] Folder structure
- [x] Video list aur range-based streaming
- [x] Watch progress save/resume
- [x] Continue Watching API
- [x] Saved Collections API
- [x] Dark / Light mode
- [ ] Auth
- [ ] Database
- [ ] Upload
- [ ] Monetization, recommendations, offline download, admin, parental controls (baad me)