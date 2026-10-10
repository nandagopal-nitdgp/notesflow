<div align="center">

# 📝 NotesFlow

### *Streamlined, Secure, and Real-Time Note Management with Distributed Rate Limiting*

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white&style=for-the-badge)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?logo=express&logoColor=white&style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white&style=for-the-badge)](https://www.mongodb.com/)
[![Upstash Redis](https://img.shields.io/badge/Upstash-Redis_Rate_Limiter-00E599?logo=redis&logoColor=white&style=for-the-badge)](https://upstash.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-Forest_Theme-5A0EF8?logo=daisyui&logoColor=white&style=for-the-badge)](https://daisyui.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)

<br/>

<p align="center">
  <b>NotesFlow</b> is a modern, high-performance full-stack note-taking web application built on the <b>MERN</b> stack and engineered with <b>distributed rate limiting</b> powered by Upstash Redis. Featuring an immersive neon-dark aesthetic using DaisyUI's Forest theme, NotesFlow offers an effortless way to create, view, edit, and organize notes while ensuring robust server-side API protection.
</p>

[Explore Features](#-key-features) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [API Reference](#-api-documentation) • [Environment Variables](#-environment-variables)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
  - [4. Run Concurrently](#4-run-both-services)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Rate Limiting Mechanism](#-rate-limiting-mechanism)
- [Scripts Reference](#-scripts-reference)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**NotesFlow** was designed with both developer ergonomics and production resilience in mind. Typical note applications fall short when exposed to rapid bot traffic or accidental spamming. NotesFlow integrates serverless **Upstash Redis Sliding Window Rate Limiting** at the Express middleware layer, paired with dynamic UI status warnings and toast notifications to deliver feedback whenever limits are hit.

---

## ✨ Key Features

- **⚡ Full CRUD Operations**:
  - **Create**: Add rich notes with customizable titles and bodies with real-time field validation.
  - **Read**: Browse all notes sorted in reverse chronological order (newest first) or inspect individual note details.
  - **Update**: Edit note titles and content directly in a dedicated management view.
  - **Delete**: Instant note removal backed by intuitive user confirmation prompts and optimistic UI updates.
- **🛡️ Distributed Sliding Window Rate Limiting**:
  - Enforced via **Upstash Redis** (`10 requests / 20 seconds` sliding window).
  - Protects database queries and API resources against abusive requests and DDoS traffic.
- **🎨 Modern Cyberpunk / Forest Aesthetic**:
  - Powered by **Tailwind CSS** and **DaisyUI** with the sleek `forest` dark theme.
  - Vibrant accent styling (`#00FF9D`), soft radial dark gradient backgrounds, and Lucide icons.
- **🔔 Interactive Toast & Rate Limit Feedback**:
  - Seamless notification alerts via **React Hot Toast**.
  - Custom UI banner (`RateLimitedUI`) activates gracefully whenever HTTP `429 Too Many Requests` is returned.
- **🌐 Network & DNS Resilience**:
  - Built-in DNS resolver fallback (`8.8.8.8`, `1.1.1.1`) to resolve MongoDB SRV connection issues commonly encountered across restrictive ISPs.
- **📱 Fully Responsive**:
  - Fluid multi-column responsive grid layout adapting across mobile, tablet, and widescreen displays.

---

## 🏗️ Architecture


graph TD
    User["👤 User Browser"] -->|HTTP / React 19| Frontend["💻 NotesFlow Frontend (Vite + React)"]
    Frontend -->|Axios REST Calls| Backend["⚙️ Express API Server (Port 5001)"]
    
    subgraph Middleware & Protection
        Backend -->|Rate Check| Redis["⚡ Upstash Redis (Sliding Window: 10 req / 20s)"]
    end

    Redis -->|Allowed| Controller["🎮 Notes Controller"]
    Redis -.->|Limit Exceeded (429)| Backend
    Backend -.->|HTTP 429 Status| Frontend
    Frontend -.->|Display Banner & Toast| User

    subgraph Data Persistence
        Controller -->|Query / Mutation| Mongo[("🍃 MongoDB Database")]
        Mongo -->|Saved Document| Controller
    end

    Controller -->|JSON Response (200 / 201)| Frontend
    Frontend -->|Render UI / Note Cards| User
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Description |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Core UI library for component-driven interfaces |
| **[Vite 8](https://vitejs.dev/)** | Next-generation frontend bundler with instant HMR |
| **[Tailwind CSS 3](https://tailwindcss.com/)** | Utility-first CSS framework |
| **[DaisyUI 4](https://daisyui.com/)** | Component library for Tailwind (`forest` theme) |
| **[React Router 8](https://reactrouter.com/)** | Client-side routing and page management |
| **[Axios](https://axios-http.com/)** | Promise-based HTTP client with dynamic base URL support |
| **[Lucide React](https://lucide.dev/)** | Minimalist modern SVG icon set |
| **[React Hot Toast](https://react-hot-toast.com/)** | Lightweight, animated toast notification alerts |

### Backend
| Technology | Description |
| :--- | :--- |
| **[Node.js](https://nodejs.org/)** | JavaScript runtime environment (ES Modules) |
| **[Express.js](https://expressjs.com/)** | Fast, unopinionated web framework for Node.js |
| **[MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)** | NoSQL document database and schema modeling |
| **[@upstash/ratelimit](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview)** | Serverless Redis rate limiter algorithm (sliding window) |
| **[@upstash/redis](https://upstash.com/docs/redis/overall/getstarted)** | Serverless HTTP/REST-based Redis client |
| **[CORS](https://github.com/expressjs/cors)** | Cross-Origin Resource Sharing middleware |
| **[Dotenv](https://github.com/motdotla/dotenv)** | Environment variable management |
| **[Nodemon](https://nodemon.io/)** | Automatic development server restarter |

---

## 📁 Project Structure

```text
notesflow/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js             # MongoDB connection & DNS resolver fallback
│   │   │   └── upstash.js        # Upstash Redis client & RateLimit configuration
│   │   ├── controllers/
│   │   │   └── notesController.js# CRUD controller logic (create, read, update, delete)
│   │   ├── middleware/
│   │   │   └── rateLimiter.js    # Express rate-limiting middleware (HTTP 429 handler)
│   │   ├── models/
│   │   │   └── Note.js           # Mongoose schema for Note documents
│   │   ├── routes/
│   │   │   └── notesRoutes.js    # Express route mappings for /api/notes
│   │   └── server.js             # Main server bootstrap, CORS, and middleware loader
│   ├── .env.example              # Sample environment configuration template
│   └── package.json              # Backend dependencies and scripts
│
├── frontend/
│   ├── lib/
│   │   ├── axios.js              # Axios instance with development/production base URLs
│   │   └── utils.js              # Formatting helpers (e.g., formatDate)
│   ├── public/                   # Public static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── navbar.jsx        # Navigation header with "New Note" action
│   │   │   ├── NoteCard.jsx      # Note item preview card with edit/delete triggers
│   │   │   ├── NotesNotFound.jsx # Empty state placeholder when no notes exist
│   │   │   └── RateLimitedUI.jsx # Visual banner displayed upon hitting rate limits
│   │   ├── pages/
│   │   │   ├── CreatePage.jsx    # Note creation form view
│   │   │   ├── HomePage.jsx      # Grid view of all notes + rate limit detector
│   │   │   └── NoteDetailPage.jsx# Detailed note editor and single-note view
│   │   ├── App.jsx               # Route configurations and radial backdrop layout
│   │   ├── index.css             # Tailwind style imports
│   │   └── main.jsx              # React DOM entry point with Toast Provider
│   ├── tailwind.config.js        # Tailwind & DaisyUI theme settings (forest)
│   ├── vite.config.js            # Vite configuration
│   └── package.json              # Frontend dependencies and scripts
│
├── .gitignore                    # Git ignore specifications
└── README.md                     # Comprehensive project documentation
```

---

## 🚀 Getting Started

Follow the steps below to run NotesFlow on your local development machine.

### Prerequisites

Ensure you have the following installed and configured:
- **Node.js**: `v18.x` or higher ([Download Node.js](https://nodejs.org/))
- **npm** (comes with Node.js) or **pnpm** / **yarn**
- **MongoDB Atlas** database account or a local running MongoDB instance ([Sign up](https://www.mongodb.com/cloud/atlas))
- **Upstash Redis** account ([Sign up free](https://console.upstash.com/))

---

### 1. Clone the Repository

```bash
git clone https://github.com/nandagopal-nitdgp/notesflow.git
cd notesflow
```

---

### 2. Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install backend dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file inside the `backend/` directory by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Open `backend/.env` and supply your database and Upstash Redis credentials:
   ```env
   PORT=5001
   NODE_ENV=development
   MONGO_URI=your_mongodb_connection_uri
   UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
   ```

5. **Start the backend development server**:
   ```bash
   npm run dev
   ```
   > The server will start on `http://localhost:5001` with Nodemon listening for hot changes.

---

### 3. Frontend Setup

1. **Open a new terminal window** and navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Start the Vite development server**:
   ```bash
   npm run dev
   ```
   > The frontend will launch at `http://localhost:5173`. Open this URL in your web browser.

---

### 4. Run Both Services

| Service | Local URL | Port |
| :--- | :--- | :--- |
| **Frontend UI** | `http://localhost:5173` | `5173` |
| **Backend API** | `http://localhost:5001/api/notes` | `5001` |

---

## 🔐 Environment Variables

The backend requires the following environment variables to function correctly. Store these in `backend/.env`:

| Variable | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `PORT` | Optional | Port on which the Express server listens (default: `5001`) | `5001` |
| `NODE_ENV` | Optional | Application runtime mode (`development` or `production`) | `development` |
| `MONGO_URI` | **Yes** | MongoDB connection string (Atlas or local) | `mongodb+srv://user:pass@cluster.mongodb.net/notes_db` |
| `UPSTASH_REDIS_REST_URL` | **Yes** | REST API URL of your Upstash Redis database | `https://xxxx-xxxxx.upstash.io` |
| `UPSTASH_REDIS_REST_TOKEN`| **Yes** | Secret REST API Token from Upstash console | `gQAAAAAAAiwLAAIgc...` |

> ⚠️ **Important**: Never commit your `.env` file to version control. The root `.gitignore` is already configured to keep `.env` safe.

---

## 📡 API Documentation

Base URL in local development: `http://localhost:5001/api`

### Endpoints Overview

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/notes` | Fetch all notes (sorted newest first) | `200 OK` |
| `GET` | `/api/notes/:id` | Fetch a single note by MongoDB `_id` | `200 OK` / `404 Not Found` |
| `POST` | `/api/notes` | Create a new note | `201 Created` / `500 Error` |
| `PUT` | `/api/notes/:id` | Update an existing note by `_id` | `200 OK` / `404 Not Found` |
| `DELETE` | `/api/notes/:id` | Delete a note by `_id` | `200 OK` / `404 Not Found` |

---

### Detailed Endpoint Specifications

#### 1. Get All Notes
- **Method**: `GET`
- **Route**: `/api/notes`
- **Response** `(200 OK)`:
  ```json
  [
    {
      "_id": "673f4e29b12a8f0012c89012",
      "title": "Meeting Notes",
      "content": "Discuss architecture migration to microservices.",
      "createdAt": "2026-10-10T05:12:00.000Z",
      "updatedAt": "2026-10-10T05:12:00.000Z"
    }
  ]
  ```

#### 2. Get Single Note by ID
- **Method**: `GET`
- **Route**: `/api/notes/:id`
- **Response** `(200 OK)`:
  ```json
  {
    "_id": "673f4e29b12a8f0012c89012",
    "title": "Meeting Notes",
    "content": "Discuss architecture migration to microservices.",
    "createdAt": "2026-10-10T05:12:00.000Z",
    "updatedAt": "2026-10-10T05:12:00.000Z"
  }
  ```
- **Error Response** `(404 Not Found)`:
  ```json
  { "message": "Note not found!" }
  ```

#### 3. Create Note
- **Method**: `POST`
- **Route**: `/api/notes`
- **Request Body**:
  ```json
  {
    "title": "Project Roadmap",
    "content": "Sprint 1: Auth & Rate Limiting. Sprint 2: Rich-text Editor."
  }
  ```
- **Response** `(201 Created)`:
  ```json
  {
    "_id": "673f500ab12a8f0012c89013",
    "title": "Project Roadmap",
    "content": "Sprint 1: Auth & Rate Limiting. Sprint 2: Rich-text Editor.",
    "createdAt": "2026-10-10T05:25:00.000Z",
    "updatedAt": "2026-10-10T05:25:00.000Z"
  }
  ```

#### 4. Update Note
- **Method**: `PUT`
- **Route**: `/api/notes/:id`
- **Request Body**:
  ```json
  {
    "title": "Updated Roadmap Title",
    "content": "Updated content goes here..."
  }
  ```
- **Response** `(200 OK)`:
  ```json
  {
    "_id": "673f500ab12a8f0012c89013",
    "title": "Updated Roadmap Title",
    "content": "Updated content goes here...",
    "updatedAt": "2026-10-10T05:30:00.000Z"
  }
  ```

#### 5. Delete Note
- **Method**: `DELETE`
- **Route**: `/api/notes/:id`
- **Response** `(200 OK)`:
  ```json
  {
    "message": "Note deleted successfully!"
  }
  ```

---

## ⚡ Rate Limiting Mechanism

NotesFlow implements a sliding-window rate limiting algorithm using `@upstash/ratelimit`:

```javascript
// backend/src/config/upstash.js
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "20 s"),
});
```

### How it works:
1. Every incoming HTTP request to the Express backend passes through `middleware/rateLimiter.js`.
2. Upstash calculates request frequencies over a sliding **20-second** window.
3. If requests exceed **10 requests within 20 seconds**, the middleware rejects the request:
   - **HTTP Status**: `429 Too Many Requests`
   - **Response Body**:
     ```json
     {
       "message": "Too many requests, please try again later"
     }
     ```
4. **Frontend Response**:
   - The homepage dynamically detects HTTP 429 and mounts the `<RateLimitedUI />` banner.
   - Form submissions display an animated toast notification (`💀 Too many requests`).

---

## 📜 Scripts Reference

### Backend (`/backend`)
| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Runs the API server with `nodemon` for auto-restart on file change |
| `start` | `npm start` | Runs the API server in production mode using `node` |

### Frontend (`/frontend`)
| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Starts Vite local dev server with Hot Module Replacement (HMR) |
| `build` | `npm run build` | Compiles and optimizes assets into production bundle (`dist/`) |
| `preview` | `npm run preview` | Locally preview the production build output |
| `lint` | `npm run lint` | Runs ESLint to verify code quality and style rules |

---

## 🚀 Deployment Guide

### Deploying the Backend
1. **Render / Railway / Fly.io**:
   - Connect your GitHub repository.
   - Set the root directory to `backend`.
   - Set build command: `npm install`.
   - Set start command: `npm start`.
   - Configure all environment variables (`MONGO_URI`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `NODE_ENV=production`).

### Deploying the Frontend
1. **Vercel / Netlify**:
   - Connect your GitHub repository.
   - Set root directory to `frontend`.
   - Build command: `npm run build`.
   - Output directory: `dist`.
   - Set up API proxying or update `frontend/lib/axios.js` to target your deployed backend API URL.

---

## 🤝 Contributing

Contributions are always welcome! Follow these steps to contribute:

1. **Fork the Repository**
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit Your Changes**:
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. **Push to the Branch**:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

<div align="center">

Crafted with 💚 by [Nandagopal](https://github.com/nandagopal-nitdgp)

*If you found this project helpful, give it a ⭐ on [GitHub](https://github.com/nandagopal-nitdgp/notesflow)!*

</div>
