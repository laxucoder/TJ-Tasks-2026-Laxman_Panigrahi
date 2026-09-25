# TaskFlow — Modern Full-Stack Task Management

A polished SaaS-style task management application built for the **TechnoJam Web Development Technical Audition 2026**. TaskFlow provides a responsive dashboard for creating, tracking, searching, filtering, sorting, editing, completing, and deleting tasks with persistent MongoDB storage.

> **Repository:** `TJ-Tasks-2026-Laxman_Panigrahi`

## ✨ Project Preview

TaskFlow combines a clean dashboard, dynamic statistics, task cards, responsive navigation, dark mode, and a REST API backed by MongoDB.

### Features

- 📊 Dynamic dashboard statistics
- ➕ Create tasks with validation
- ✏️ Edit existing tasks
- 🗑️ Delete tasks with confirmation
- ✅ Mark tasks completed
- 🔎 Search by title/description
- 🎯 Filter by status and priority
- ↕️ Sort by due date, priority, title, or newest
- 📅 Due dates and overdue indicators
- 🌙 Light/Dark mode
- 🔔 Toast notifications
- ⏳ Loading, error, and empty states
- 📱 Responsive desktop/tablet/mobile UI
- 🔌 REST API with Express + MongoDB
- 🛡️ Environment-based configuration and CORS

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| API | REST |
| Tooling | Git, GitHub, npm |

## 🏗️ Architecture

```text
Browser
  │
  ▼
React + Vite + Tailwind
  │  API service (fetch)
  ▼
Express REST API
  │
  ├── Routes
  ├── Controllers
  ├── Validation / Error middleware
  ▼
Mongoose
  │
  ▼
MongoDB
```

## 📁 Project Structure

```text
TJ-Tasks-2026-Laxman_Panigrahi/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AppShell.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskToolbar.jsx
│   │   │   └── Toast.jsx
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/
│   ├── controllers/taskController.js
│   ├── middleware/errorHandler.js
│   ├── models/Task.js
│   ├── routes/taskRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── screenshots/
├── .gitignore
└── README.md
```

## 🚀 How It Works

1. The React dashboard requests tasks from `GET /api/tasks`.
2. Express routes the request to the task controller.
3. Mongoose reads/writes task documents in MongoDB.
4. The API returns JSON to the frontend.
5. React updates the dashboard, statistics, filters, and task list without a page refresh.

## ⚙️ Prerequisites

- Node.js 18+
- npm 9+
- A MongoDB database (local MongoDB or MongoDB Atlas)
- Git

## 🖥️ Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The Vite app runs on the URL shown by Vite, normally `http://localhost:5173`.

## 🧩 Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The API defaults to `http://localhost:5000`.

## 🍃 MongoDB Setup

### MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Add your development IP address to the Atlas network access list.
4. Copy the connection string.
5. Put it in `MONGODB_URI` in `backend/.env`.

### Local MongoDB

Use a local connection such as:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/taskflow
```

## 🔐 Environment Variables

### Backend `.env`

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/taskflow
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Never commit a real `.env` file, database password, API key, or secret.

## 📡 API Documentation

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a task |
| GET | `/tasks/:id` | Get one task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |
| GET | `/health` | API health check |

### Create Task Example

```json
POST /api/tasks
Content-Type: application/json

{
  "title": "Build portfolio dashboard",
  "description": "Create a responsive dashboard for the portfolio project.",
  "status": "Todo",
  "priority": "High",
  "dueDate": "2026-10-01"
}
```

### Response Shape

```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Build portfolio dashboard",
    "description": "...",
    "status": "Todo",
    "priority": "High",
    "dueDate": "2026-10-01T00:00:00.000Z"
  }
}
```

## 🧪 Testing Checklist

- [x] Create task UI and API flow
- [x] Read/view tasks
- [x] Edit task
- [x] Delete task with confirmation
- [x] Mark task completed
- [x] Search
- [x] Status filtering
- [x] Priority filtering
- [x] Sorting
- [x] Dynamic dashboard statistics
- [x] Dark mode
- [x] Responsive mobile layout
- [x] Loading state
- [x] Error state
- [x] Empty state
- [x] Database persistence through API
- [x] REST endpoint validation

> Final integration testing requires a running MongoDB instance because this source package does not contain credentials or a database dump.

## 📸 Screenshots

The `screenshots/` directory is reserved for captured desktop, mobile, and dark-mode screenshots after running the app locally. No fake screenshots are included.

Suggested captures:

- `dashboard-light.png`
- `dashboard-dark.png`
- `mobile-dashboard.png`
- `create-task.png`

## 🌐 Live Demo

Not deployed yet.

```text
https://tj-tasks-2026-laxman-panigrahi.vercel.app
```

## 🐙 GitHub Repository

```text
TJ-Tasks-2026-Laxman_Panigrahi
```

Push this folder to a GitHub repository with the exact name above.

## 🔮 Future Improvements

- Authentication and user accounts
- User-specific task ownership
- Drag-and-drop Kanban board
- Pagination for very large task collections
- Server-side search/filter/sort
- Automated API tests
- CI/CD with GitHub Actions
- Production deployment
- Activity history and audit logs

## 👨‍💻 Author

**Laxman Panigrahi**  
B.Tech CSE (Data Science)

Built as a full-stack web development technical audition project.
