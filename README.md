# OFferFetch

**OFferFetch** is a personal job application tracker built to bring some order to the chaos of a job search. Instead of juggling spreadsheets or losing track of where you applied and what you sent, OFferFetch gives you one place to manage it all — applications, companies, resumes, cover letters, and a running log of every update along the way.

Built with Node.js, Express, and React, backed by PostgreSQL. Containerized with Docker for local development.

---

## 🚀 Getting Started

**Prerequisites**

Make sure you have the following installed:
- 🐳 [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- 🟢 [Node.js](https://nodejs.org/) (v18+)
- 📦 npm

**Installation**

1. Clone the repository
```bash
git clone https://github.com/chernov-ilia/offerfetch.git
cd offerfetch
```

2. Set up environment variables
```bash
cp server/.env.example server/.env
```

3. Start the database
```bash
docker compose up -d
```

4. Install dependencies and start the server
```bash
cd server
npm install
npm run dev
```

5. In a separate terminal, start the client
```bash
cd client
npm install
npm run dev
```

6. Open your browser at `http://localhost:5173` 🎉