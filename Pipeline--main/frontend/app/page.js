
"use client";
import {useEffect,useState} from "react";

export default function Home(){
 const [name,setName]=useState("");
 const [rollNumber,setRoll]=useState("");
 const [students,setStudents]=useState([]);

 const load=async()=>{
   const res=await fetch("http://localhost:3001/students");
   setStudents(await res.json());
 };

 useEffect(()=>{load();},[]);

 const save=async()=>{
   await fetch("http://localhost:3001/students",{
     method:"POST",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify({name,rollNumber})
   });
   load();
 };

 return (
  <div style={{padding:20}}>
   <h1> Aryan Students</h1>
   <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
   <input placeholder="Roll Number" value={rollNumber} onChange={e=>setRoll(e.target.value)}/>
   <button onClick={save}>Save</button>
   <ul>
    {students.map(s=><li key={s.id}>{s.name} - {s.rollNumber}</li>)}
   </ul>
  </div>
 )
}
