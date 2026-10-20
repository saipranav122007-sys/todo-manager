const express=require("express");
const {MongoClient}=require("mongodb");
const path=require("path");

const app=express();
const client=new MongoClient("mongodb://127.0.0.1:27017");
let users,todos;

app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

async function setup(){
  const db=client.db("todo_app");
  users=db.collection("users");
  todos=db.collection("todos");

  await users.createIndex({userId:1},{unique:true});
  await users.createIndex({email:1},{unique:true});
  await todos.createIndex({taskId:1},{unique:true});
}

app.get("/api/todos",async(req,res)=>{
  const data=await todos.aggregate([
    {$lookup:{from:"users",localField:"userId",foreignField:"userId",as:"user"}},
    {$unwind:{path:"$user",preserveNullAndEmptyArrays:true}},
    {$sort:{taskId:1}}
  ]).toArray();
  res.json(data);
});

app.post("/api/users",async(req,res)=>{
  try{
    const {userId,name,email}=req.body;
    await users.insertOne({userId:Number(userId),name:name.trim(),email:email.trim()});
    res.json({message:"User added"});
  }catch(e){res.status(400).json({error:"User ID or email already exists"});}
});

app.post("/api/todos",async(req,res)=>{
  try{
    const {taskId,userId,task,description,priority,category,dueDate}=req.body;
    const user=await users.findOne({userId:Number(userId)});
    if(!user)return res.status(400).json({error:"User does not exist"});
    const todo={
      taskId:Number(taskId),userId:Number(userId),task:task.trim(),
      description:description.trim(),priority,category:category.trim(),
      dueDate,completed:false
    };
    await todos.insertOne(todo);
    res.json(todo);
  }catch(e){res.status(400).json({error:"Task ID may already exist or data is invalid"});}
});

app.put("/api/todos/:id",async(req,res)=>{
  const id=Number(req.params.id);
  const allowed={};
  ["task","description","priority","category","dueDate","completed"].forEach(k=>{
    if(req.body[k]!==undefined)allowed[k]=req.body[k];
  });
  await todos.updateOne({taskId:id},{$set:allowed});
  res.json({message:"Task updated"});
});

app.delete("/api/todos/:id",async(req,res)=>{
  await todos.deleteOne({taskId:Number(req.params.id)});
  res.json({message:"Task deleted"});
});

async function start(){
  await client.connect();
  await setup();
  app.listen(3000,()=>console.log("Todo app: http://localhost:3000"));
}
start().catch(console.error);
