import express from 'express'
import mongoose from 'mongoose'
import Tasks from './mongoDB/models/tasks.js'
import Pusher from 'pusher'
import dotenv from 'dotenv'
import cors from 'cors'
import connectToMongoDB from './mongoDB/connectMongo.js'

dotenv.config()
const app = express()
connectToMongoDB()
const pusher = new Pusher({
    appId: process.env.appId,
    key: process.env.key,
    secret: process.env.secret,
    cluster: process.env.cluster,
    useTLS: true
  });
// the big three
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))

const db = mongoose.connection
db.once('open', () => {
    const tasks = db.collection('tasks')
    const changeStream = tasks.watch()
    changeStream.on('change', (change) => {
        // console.log(change)
        if (change.operationType === 'insert') {
            const taskDetails = change.fullDocument
            pusher.trigger('my-task', 'inserted', 
            {
                task: taskDetails.task,
                completed: taskDetails.completed
            }
        )} else if (change.operationType === 'delete') {
            pusher.trigger('my-task', 'deleted', 
            change.documentKey._id
        )} 
         
        else {
            console.log('Error Triggering Pusher!')
        }
    })
})

app.get('/', (req, res) => {
    res.status(200).send("server's response to home page!")
})
app.post('/api_v1/tasks/new', (req, res) => {
    const newTask = req.body
    
    Tasks.create(newTask, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})
app.get('/api_v1/tasks/sync/:id', (req, res) => {
    Tasks.findById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})
app.get('/api_v1/tasks/sync', (req, res) => {
    Tasks.find({},(err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})
app.delete('/api_v1/tasks/del/:id', (req, res) => {
    Tasks.findByIdAndDelete({_id: req.params.id}, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})
app.patch('/api_v1/tasks/update/:id', (req, res) => {
    Tasks.findByIdAndUpdate(req.params.id, {
        task: req.body.task,
        completed: req.body.completed
    }, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`server is listening through port: ${port}`))