const express = require("express")
const cors = require("cors")
const app = express()
const mysql = require("mysql")

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"12345678",
    database:"timeapp"
})
app.get("/data",(req,res)=>{
    db.query("select * from goals",(err,result)=>{
        if(err)
            throw err
        res.send(result)
    })
})
app.post("/goals",(req,res)=>{
    // const id = req.body.id
    const goal = req.body.goal
    const task = req.body.task
    const status = req.body.status
    db.query(
        "insert into goals (goal,task,status) values(?,?,?)",
        [goal,task,status],(err,result)=>{
            if(err)
                throw err
            else
                res.send("value inserted")
        }
    )

})

app.post("/update-goals",(req,res)=>{
    
    const goal = req.body.goal
    const task = req.body.task
    const status = req.body.status
    db.query(
        "update goals set task = ?,status = ? where goal = ? and task is null",
        [task,status,goal],
        (err,result)=>{
            if(err)
                console.log(err)
            res.send(result)
        }
    )
})

app.put("/finished-task",(req,res)=>{
    const task = req.body.task
    const trans = req.body.trans
    db.query(
        'insert into finishedtask (item,end_time,duration) values (?,now(),?)',
        [task,trans],
        (err,result)=>{
            if(err)
                throw err
            res.send(result)
        }
    )
})
app.get("/finished-list",(req,res)=>{
    db.query("select * from finishedtask",(err,result)=>{
        if(err)
            throw err
        res.send(result)
    })
})

app.put("/add-todo",(req,res)=>{
    const item = req.body.item
    const cost = req.body.cost
    db.query("insert into todolist (item,cost) values(?,?)",
        [item,cost],
        (err,result)=>{
            if(err)
                throw err
            res.send(result)
        }
    )
})

app.get("/get-todo",(req,res)=>{
    db.query("select * from todolist",(err,result)=>{
        if(err)
            throw err
        res.send(result)
    })
})

app.delete("/del-todo/:item",(req,res)=>{
    const item = req.params.item
    console.log(item)
    console.log("helloworld")
    // const cost = req.body.cost
    db.query("delete from todolist where item = ? ",[item],
        (err,result)=>{
            if(err)
                throw err
            res.send(result)
        }
    )
})

app.listen(3001,()=>{
    console.log("nice , your server is established!!!")
})