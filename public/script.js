async function addUser(){
const data={userId:userId.value,name:userName.value,email:userEmail.value};
const r=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
const x=await r.json();if(!r.ok)return alert(x.error);alert("User added");
}
async function addTodo(){
const data={taskId:taskId.value,userId:todoUserId.value,task:todoTask.value,description:description.value,priority:priority.value,category:category.value,dueDate:dueDate.value};
const r=await fetch("/api/todos",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
const x=await r.json();if(!r.ok)return alert(x.error);loadTodos();
}
async function loadTodos(){
const r=await fetch("/api/todos");const a=await r.json();todoList.innerHTML="";
a.forEach(t=>{todoList.innerHTML+=`<div class="todo"><b>${t.taskId}. ${esc(t.task)}</b> | <span class="${t.priority.toLowerCase()}">${t.priority}</span><br>${esc(t.description)} | ${esc(t.category)} | Due: ${t.dueDate||"None"} | User: ${t.userId} | ${t.completed?"Done":"Pending"}<br><button onclick="edit(${t.taskId},'${js(t.task)}')">Edit</button><button onclick="complete(${t.taskId},${t.completed})">${t.completed?"Pending":"Complete"}</button><button onclick="del(${t.taskId})">Delete</button></div>`});
}
async function edit(id,old){const x=prompt("New task:",old);if(!x)return;await fetch("/api/todos/"+id,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({task:x})});loadTodos()}
async function complete(id,v){await fetch("/api/todos/"+id,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({completed:!v})});loadTodos()}
async function del(id){if(confirm("Delete task?")){await fetch("/api/todos/"+id,{method:"DELETE"});loadTodos()}}
function esc(x){return String(x).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
function js(x){return String(x).replaceAll("\\","\\\\").replaceAll("'","\\'")}
loadTodos();
