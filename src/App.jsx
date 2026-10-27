import { useMemo, useState } from "react";
import { BookOpen, BrainCircuit, ChartNoAxesCombined, CheckSquare, FileText, LayoutDashboard, Settings2 } from "lucide-react";
import { AppShell } from "./components/AppShell/index.js";
import { Navbar } from "./components/Navbar/index.js";
import { Sidebar } from "./components/Sidebar/index.js";
import { StatCard } from "./components/StatCard/index.js";
import { CourseLibrary } from "./components/CourseLibrary/index.js";
import { MaterialsPanel } from "./components/MaterialsPanel/index.js";
import { TasksPanel } from "./components/TasksPanel/index.js";
import { AIStudyTools } from "./components/AIStudyTools/index.js";
import { ProgressReport } from "./components/ProgressReport/index.js";
import { SettingsPanel } from "./components/SettingsPanel/index.js";
import { Toast } from "./components/Toast/index.js";
import { Login } from "./components/Login/index.js";
import { usePersistentState } from "./hooks/usePersistentState.js";
import { initialCourses, initialMaterials, initialTasks } from "./data/initialData.js";
import styles from "./App.module.css";

const SESSION_KEY = "campusflow-auth-session";
const navItems = [
  { id: "Dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "Courses", label: "Courses", icon: BookOpen },
  { id: "Materials", label: "Study Materials", icon: FileText },
  { id: "Tasks", label: "Tasks & Assignments", icon: CheckSquare },
  { id: "AI Tools", label: "AI Study Tools", icon: BrainCircuit },
  { id: "Progress", label: "Progress Report", icon: ChartNoAxesCombined },
  { id: "Settings", label: "Settings", icon: Settings2 }
];

function readSession() {
  // Auth state is checked once on initial load; malformed storage is treated as unauthenticated.
  try {
    const value = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    return value?.authenticated === true && typeof value.username === "string" && value.username.trim()
      ? { authenticated: true, username: value.username }
      : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [session, setSession] = useState(readSession);
  const [active, setActive] = useState("Dashboard");
  const [courses, setCourses] = usePersistentState("campusflow-courses", initialCourses);
  const [materials, setMaterials] = usePersistentState("campusflow-materials", initialMaterials);
  const [tasks, setTasks] = usePersistentState("campusflow-tasks", initialTasks);
  const [toast, setToast] = useState("");
  const [profilePicture, setProfilePicture] = usePersistentState("campusflow-profile-picture", "");
  const [query, setQuery] = useState("");
  const doneTasks = tasks.filter((task) => task.completed).length;
  const materialCount = materials.length;
  const courseHours = useMemo(() => (courses.reduce((sum, course) => sum + course.progress, 0) / Math.max(courses.length, 1) / 5).toFixed(1), [courses]);

  function notify(message) {
    setToast(message);
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setToast(""), 2800);
  }

  function handleLogin(user) {
    // Store a lightweight demo session only. Never store the password in localStorage.
    const nextSession = { authenticated: true, username: user.username, createdAt: new Date().toISOString() };
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
      setSession({ authenticated: true, username: user.username });
    } catch {
      notify("Browser storage is unavailable. Sign-in cannot persist in this browser.");
    }
  }

  function handleLogout() {
    try { localStorage.removeItem(SESSION_KEY); } catch { /* ignore storage access failures */ }
    setSession(null);
    setActive("Dashboard");
    setQuery("");
  }

  if (!session?.authenticated) return <Login onLogin={handleLogin} />;

  const shared = { courses, setCourses, materials, setMaterials, tasks, setTasks, notify, query, setQuery, setActive };
  const title = navItems.find((item) => item.id === active)?.label || active;

  return (
    <AppShell>
      <Sidebar items={navItems} active={active} onChange={setActive} />
      <main className={styles.main}>
        <Navbar title={title} query={query} onQueryChange={setQuery} onMenu={() => document.body.classList.toggle("sidebar-open")} profilePicture={profilePicture} onProfilePictureChange={setProfilePicture} notify={notify} username={session.username} onLogout={handleLogout} />
        {active === "Dashboard" && (
          <>
            <section className={styles.welcome}>
              <div><p className={styles.eyebrow}>YOUR LEARNING SPACE</p><h1>Welcome back, {session.username}! <span aria-hidden="true">✦</span></h1><p className={styles.subtitle}>Small steps today, stronger skills tomorrow.</p></div>
              <button className={styles.primaryButton} onClick={() => setActive("Courses")}>＋ Add a course</button>
            </section>
            <section className={styles.stats}>
              <StatCard label="Enrolled courses" value={courses.length} note="Across your semesters" icon={BookOpen} tint="purple" />
              <StatCard label="Study progress" value={`${courseHours} hrs`} note="Estimated learning progress" icon={ChartNoAxesCombined} tint="green" />
              <StatCard label="Materials saved" value={materialCount} note="In your study library" icon={FileText} tint="blue" />
              <StatCard label="Tasks completed" value={`${doneTasks}/${tasks.length}`} note="Keep your momentum" icon={CheckSquare} tint="orange" />
            </section>
            <div className={styles.dashboardGrid}>
              <CourseLibrary {...shared} compact />
              <div className={styles.rightColumn}>
                <div className={styles.aiBanner}><span className={styles.sparkle}>✦</span><h2>Your AI study companion</h2><p>Turn notes into clear summaries, concept explanations and practice quizzes.</p><button onClick={() => setActive("AI Tools")}>Explore AI tools <span>↗</span></button></div>
                <TasksPanel {...shared} compact />
                <MaterialsPanel {...shared} compact />
              </div>
            </div>
          </>
        )}
        {active === "Courses" && <CourseLibrary {...shared} />}
        {active === "Materials" && <MaterialsPanel {...shared} />}
        {active === "Tasks" && <TasksPanel {...shared} />}
        {active === "AI Tools" && <AIStudyTools notify={notify} />}
        {active === "Progress" && <ProgressReport courses={courses} tasks={tasks} materials={materials} />}
        {active === "Settings" && <SettingsPanel notify={notify} profilePicture={profilePicture} onProfilePictureChange={setProfilePicture} />}
      </main>
      <Toast message={toast} />
    </AppShell>
  );
}
