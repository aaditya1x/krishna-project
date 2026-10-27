# CampusFlow — React + Vite

A modular, responsive student dashboard converted to React 18 + Vite. It uses CSS variables and React Context for persistent 10 themes: Light, Dark, System, Cyber Grid, Midnight Neon, Sunset Amber, Forest Emerald, Ocean Blue, Rose Quartz, and Solar Gold. Scheduling/calendar features are intentionally excluded.

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Run locally (Windows PowerShell)
```powershell
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Build for production
```powershell
npm run build
npm run preview
```

## Architecture
```text
src/
├── components/
│   ├── AppShell/
│   ├── Navbar/
│   ├── Sidebar/
│   ├── ThemeSwitcher/
│   ├── StatCard/
│   ├── CourseCard/
│   ├── CourseLibrary/
│   ├── MaterialsPanel/
│   ├── TasksPanel/
│   ├── AIStudyTools/
│   ├── ProgressReport/
│   ├── SettingsPanel/
│   ├── EmptyState/
│   └── Toast/
├── context/ThemeContext.jsx
├── data/initialData.js
├── hooks/usePersistentState.js
├── App.jsx
├── index.jsx
└── styles/global.css
```

Every component lives in its own folder and exports via `index.js`. Component styles are colocated as CSS modules.

## Functionality
- Course search, semester filtering, and adding courses
- Study material file selection with temporary browser object URLs and subject labels
- Task creation and completion state
- AI study tools UI with safe demo output; connect a server-side AI endpoint to enable real generation
- Progress report and settings
- Ten persistent themes (Light, Dark, System, Cyber Grid, Midnight Neon, Sunset Amber, Forest Emerald, Ocean Blue, Rose Quartz, Solar Gold) via React Context and localStorage
- Delete controls for courses and tasks, with confirmation prompts
- Upload/change/remove profile picture, persisted locally in browser storage
- No schedule, calendar, timetable, or time-slot features

## Production notes
This project is a frontend-only conversion. Browser localStorage is used for demo persistence. Selected files are kept as browser-session object URLs and are not uploaded to a server. Add authentication, a database, server-side validation, and protected file storage before deploying for multiple users. Do not place private AI API keys in frontend code.


## Local demo authentication
- The app starts at the Login page unless `campusflow-auth-session` contains a valid local demo session.
- A non-empty username/email and password are required; password is never stored.
- Successful sign-in stores only a simple session marker and username in `localStorage`.
- Log Out removes the session marker and returns to Login.
- **Security limitation:** this is client-side demo authentication only. It does not verify credentials against a server and can be bypassed by editing browser storage. Use a server-side identity provider and secure, HTTP-only cookies for real accounts.

## Task completion progress
The Progress Report calculates `(completed tasks / total tasks) * 100`, returns `0%` when there are no tasks, and explicitly renders `100%` when all tasks are complete.
