import { GraduationCap, X } from "lucide-react";
import styles from "./Sidebar.module.css";
export default function Sidebar({ items, active, onChange }) {
  return <aside className={styles.sidebar} aria-label="Main navigation">
    <div className={styles.brand}><span className={styles.logo}><GraduationCap size={21}/></span><span>CampusFlow</span><button className={styles.close} aria-label="Close navigation" onClick={() => document.body.classList.remove("sidebar-open")}><X size={18}/></button></div>
    <p className={styles.label}>WORKSPACE</p>
    <nav className={styles.nav}>{items.map(({id,label,icon:Icon}) => <button key={id} onClick={() => { onChange(id); document.body.classList.remove("sidebar-open"); }} className={`${styles.navItem} ${active===id?styles.active:""}`} aria-current={active===id?"page":undefined}><Icon size={18}/><span>{label}</span></button>)}</nav>
    <div className={styles.bottom}><div className={styles.tipIcon}>✦</div><strong>Make progress daily</strong><p>Build a steady learning habit, one session of focus at a time.</p><div className={styles.miniProgress}><span/></div><small>Consistency over perfection</small></div>
  </aside>;
}
