import { useState } from "react";
import { ArrowRight, BookOpen, Eye, EyeOff, GraduationCap, LockKeyhole, UserRound } from "lucide-react";
import styles from "./Login.module.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const cleanUsername = username.trim();
    if (!cleanUsername || !password) {
      setError("Enter both your username/email and password.");
      return;
    }
    if (cleanUsername.length < 2) {
      setError("Username or email must contain at least 2 characters.");
      return;
    }
    // This is a local demo sign-in, not secure server-side authentication.
    onLogin({ username: cleanUsername });
  }

  return <main className={styles.page}>
    <div className={styles.decor} aria-hidden="true"><span/><span/><span/></div>
    <section className={styles.card} aria-labelledby="login-title">
      <div className={styles.brand}><span className={styles.logo}><GraduationCap size={23}/></span><span>CampusFlow</span></div>
      <div className={styles.heading}><div className={styles.book}><BookOpen size={22}/></div><h1 id="login-title">Welcome back</h1><p>Sign in to continue your learning journey.</p></div>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="username">Username or email</label>
        <div className={styles.field}><UserRound size={17}/><input id="username" name="username" autoComplete="username" value={username} onChange={e=>{setUsername(e.target.value);setError("");}} placeholder="Enter your username" required/></div>
        <label htmlFor="password">Password</label>
        <div className={styles.field}><LockKeyhole size={17}/><input id="password" name="password" type={showPassword?"text":"password"} autoComplete="current-password" value={password} onChange={e=>{setPassword(e.target.value);setError("");}} placeholder="Enter your password" required/><button className={styles.eye} type="button" onClick={()=>setShowPassword(v=>!v)} aria-label={showPassword?"Hide password":"Show password"}>{showPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></div>
        {error&&<p className={styles.error} role="alert">{error}</p>}
        <button className={styles.submit} type="submit">Sign in <ArrowRight size={17}/></button>
      </form>
      <p className={styles.note}>Local demo authentication · Your session is saved in this browser.</p>
    </section>
    <p className={styles.footer}>Learn a little. Grow a lot.</p>
  </main>;
}
