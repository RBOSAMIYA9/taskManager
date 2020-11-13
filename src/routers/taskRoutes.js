const express = require('express');
require('../db/mongoose')
const Task = require('../models/tasks');

const taskRouter = new express.Router()
taskRouter.use(express.json())
// taskRouter.get('/test',(req,res)=>{
//     res.send("assasa");
// // })

taskRouter.post('/AddTask', async (req, res) => {
    console.log(req.body);
    const task = new Task(req.body)
    try {

        await task.save()
        res.send(task);
    }
    catch(error) {
        res.status(400).send(error);
    }

})

taskRouter.get('/getTask', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)

    } catch (error) {
        res.status(500).send(error)
    }
})


taskRouter.get('/getTask/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {

        res.status(500).send(e)
    }
})


taskRouter.patch('/getTask/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description','completed'];
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })
    if (!isValidOperation) {
        return res.status(400).send({error:"invalid updates"})
    }
    try {
        const _id = req.params.id;
        const task = await Task.findOneAndUpdate(_id,req.body,{new :true, runValidators:true});
        if (!task) {
            return res.status(404).send();
        }
        res.send(task)
    } catch (e) {

        res.status(400).send(e) ;
    }
})


taskRouter.delete('/getTask/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findByIdAndDelete(_id)
        if (!task) {
            return res.status(404).send({error : "No such task found"})
        }
        res.send(task)
    } catch (e) {

        res.status(500).send(e)
    }
})

module.exports = taskRouter; 