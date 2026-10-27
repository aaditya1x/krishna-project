import { useMemo, useState } from "react";
import { Plus, BookOpen } from "lucide-react";
import { CourseCard } from "../CourseCard/index.js";
import { EmptyState } from "../EmptyState/index.js";
import styles from "./CourseLibrary.module.css";
export default function CourseLibrary({ courses, setCourses, notify, query="", compact=false }) {
  const [semester,setSemester] = useState("all");
  const visible = useMemo(()=>courses.filter(c=>(semester==="all"||String(c.semester)===semester)&&`${c.name} ${c.code}`.toLowerCase().includes(query.toLowerCase())),[courses,semester,query]);
  function deleteCourse(course) {
    const confirmed = window.confirm(`Delete "${course.name}"? This removes it from your course library.`);
    if (!confirmed) return;
    setCourses(old => old.filter(item => item.id !== course.id));
    notify?.(`${course.name} deleted.`);
  }
  function addCourse() {
    const name=window.prompt("Course or subject name?");
    if(!name?.trim()) return;
    const code=(window.prompt("Short course code?",name.trim().toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,8))||"").trim();
    if(!code) return;
    const sem=Number(window.prompt("Semester (1–12)?","3"));
    if(!Number.isInteger(sem)||sem<1||sem>12) return notify("Enter a semester between 1 and 12.");
    if(courses.some(c=>c.code.toLowerCase()===code.toLowerCase())) return notify("That course code already exists.");
    setCourses(old=>[...old,{id:crypto.randomUUID(),name:name.trim(),code,semester:sem,progress:0,color:["purple","green","blue","orange"][old.length%4],materials:0}]);
    notify("Course added.");
  }
  return <section className={styles.panel}><div className={styles.header}><div><h2>{compact?"My courses":"Course library"}</h2><p>{compact?"Your semester at a glance":"Browse subjects and track your learning progress."}</p></div><div className={styles.controls}><select value={semester} onChange={e=>setSemester(e.target.value)} aria-label="Filter by semester"><option value="all">All semesters</option>{Array.from({length:12},(_,i)=><option key={i+1} value={String(i+1)}>Semester {i+1}</option>)}</select><button onClick={addCourse} className={styles.add}><Plus size={15}/><span>Add course</span></button></div></div><div className={styles.grid}>{visible.slice(0,compact?4:undefined).map(course=><CourseCard key={course.id} course={course} onOpen={()=>notify(`${course.name} selected. Add materials and tasks to continue.`)} onDelete={deleteCourse}/>)}</div>{!visible.length&&<EmptyState icon={BookOpen} title="No courses found" description="Try another search or add a new course."/>}</section>;
}
