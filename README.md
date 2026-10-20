# Todo Manager - Full Stack MongoDB Project

## Database
Database: `todo_app`

Collections:
- `users`
- `todos`

### users
- `_id` = MongoDB automatic document ID
- `userId` = unique user ID
- `name`
- `email` = unique

### todos
- `_id` = MongoDB automatic document ID
- `taskId` = unique task serial number / application primary key
- `userId` = reference to `users.userId` (foreign-key style relationship)
- `task`
- `description`
- `priority`
- `category`
- `dueDate`
- `completed`

MongoDB does not enforce SQL-style foreign keys. The Node backend checks that the referenced user exists before creating a task.

## Run
1. Start MongoDB Server.
2. Open this folder in VS Code.
3. Run `npm install`
4. Run `npm start`
5. Open http://localhost:3000
6. Open Compass and connect to `mongodb://127.0.0.1:27017`

## mongosh demo

Open:
`mongosh`

Then:

`use todo_app`

### Create user
`db.users.insertOne({userId:1,name:"Pranav",email:"pranav@gmail.com"})`

### Create task
`db.todos.insertOne({taskId:1,userId:1,task:"Study MongoDB",description:"Practice CRUD",priority:"High",category:"College",dueDate:"2026-10-10",completed:false})`

### Find
`db.todos.find()`

### Find one
`db.todos.findOne({taskId:1})`

### Find user's tasks
`db.todos.find({userId:1})`

### Update
`db.todos.updateOne({taskId:1},{$set:{completed:true}})`

### Edit
`db.todos.updateOne({taskId:1},{$set:{task:"Study MongoDB CRUD"}})`

### Delete
`db.todos.deleteOne({taskId:1})`

## Constraints
The Node backend creates unique indexes on:
- `users.userId`
- `users.email`
- `todos.taskId`

This prevents duplicate IDs and duplicate emails.

## Viva
Primary key: `taskId` uniquely identifies a task in the application. MongoDB also automatically creates `_id`.

Foreign key: `userId` in `todos` references `userId` in `users`.

CRUD:
- Create = insertOne()
- Read = find()/findOne()
- Update = updateOne()
- Delete = deleteOne()

Frontend sends requests to Express. Express uses the MongoDB driver to read/write MongoDB. The frontend never connects directly to MongoDB.



## Git Workflow Demonstration

This project demonstrates:
- Git initialization and commits
- Branch creation and switching
- Remote repository management with GitHub
- Pushing and pulling changes
- Merging branches