
const express=require('express');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.json());

let students=[];

app.get('/students',(req,res)=>res.json(students));

app.post('/students',(req,res)=>{
 const student={id:Date.now(),...req.body};
 students.push(student);
 res.json(student);
});

app.listen(3001,()=>console.log('running on 3001'));
