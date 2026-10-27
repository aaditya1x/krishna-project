import { useRef, useState } from "react";
import { FileText, UploadCloud, Trash2, File, Download } from "lucide-react";
import { EmptyState } from "../EmptyState/index.js";
import styles from "./MaterialsPanel.module.css";
function fileSize(bytes){return bytes>1048576?`${(bytes/1048576).toFixed(1)} MB`:`${Math.max(1,Math.round(bytes/1024))} KB`;}
export default function MaterialsPanel({materials,setMaterials,notify,compact=false}) {
  const inputRef=useRef(null);
  const [subject,setSubject]=useState("DBMS");
  function handleFiles(event){
    const files=Array.from(event.target.files||[]);
    files.forEach(file=>{
      if(file.size>10*1024*1024){notify(`${file.name} is over the 10 MB demo limit.`);return;}
      const url=URL.createObjectURL(file);
      setMaterials(old=>[{id:crypto.randomUUID(),name:file.name,subject,size:file.size,type:file.name.split(".").pop().toUpperCase(),addedAt:"Just now",url},...old]);
    });
    if(files.length) notify(`${files.length} file(s) added to this browser demo.`);
    event.target.value="";
  }
  function remove(material){
    if(material.url) URL.revokeObjectURL(material.url);
    setMaterials(old=>old.filter(item=>item.id!==material.id));
    notify("Material removed.");
  }
  const list=compact?materials.slice(0,3):materials;
  return <section className={styles.panel}><div className={styles.header}><div><h2>{compact?"Recent materials":"Study materials"}</h2><p>{compact?"Your recently saved notes":"Upload and organize your notes by subject."}</p></div>{compact&&<span className={styles.count}>{materials.length} files</span>}</div>{!compact&&<div className={styles.upload}><UploadCloud size={29}/><strong>Upload your materials</strong><p>PDF, DOCX, PPTX, TXT, images and more · 10 MB max</p><div className={styles.uploadActions}><select value={subject} onChange={e=>setSubject(e.target.value)} aria-label="Select material subject"><option>DBMS</option><option>DSA</option><option>PPS</option><option>MATH</option><option>General</option></select><button onClick={()=>inputRef.current?.click()}><UploadCloud size={15}/> Choose files</button><input ref={inputRef} type="file" multiple hidden accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.xlsx,.csv" onChange={handleFiles}/></div></div>}<div className={styles.list}>{list.map(m=><div className={styles.item} key={m.id}><span className={styles.fileIcon}><FileText size={18}/></span><div className={styles.info}><strong title={m.name}>{m.name}</strong><small>{m.subject} · {m.type} · {fileSize(m.size)}</small></div>{m.url&&<a className={styles.open} href={m.url} download={m.name} title="Download file"><Download size={15}/></a>}<button className={styles.remove} onClick={()=>remove(m)} title="Remove material" aria-label={`Remove ${m.name}`}><Trash2 size={15}/></button></div>)}</div>{!list.length&&<EmptyState icon={File} title="Your library is empty" description="Upload class notes and reference files to get started."/>}{compact&&<button className={styles.viewAll} onClick={()=>notify("Choose Study Materials in the sidebar to manage uploads.")}>View materials <span>→</span></button>}</section>;
}
