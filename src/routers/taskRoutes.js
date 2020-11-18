const express = require('express');
require('../db/mongoose')
const Task = require('../models/tasks');
const auth = require('../middleware/auth')

const taskRouter = new express.Router()
taskRouter.use(express.json())

taskRouter.post('/AddTask', auth, async (req, res) => {
    // console.log("add task");
    // console.log(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    // console.log(task); 
    try {

        await task.save()
        res.send(task);
    }
    catch (error) {
        res.status(400).send(error);
    }

})

taskRouter.get('/getTask', auth, async (req, res) => {
    const match = {}
    const sort = {}
    if (req.query.sortBy) {
        const part = req.query.sortBy.split('_');
        sort[part[0]] = part[1] === 'desc' ? -1 : 1
        console.log(sort);
    }

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    try {
        // const tasks = await Task.find({owner:req.user._id})
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)

    } catch (error) {
        res.status(500).send(error)
    }
})


taskRouter.get('/getTask/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {

        res.status(500).send(e)
    }
})


taskRouter.patch('/getTask/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })
    if (!isValidOperation) {
        return res.status(400).send({ error: "invalid updates" })
    }
    try {
        const _id = req.params.id;
        // const task = await Task.findById(_id);
        const task = await Task.findOne({ _id, owner: req.user._id })

        // const task = await Task.findOneAndUpdate(_id,req.body,{new :true, runValidators:true});
        if (!task) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            task[update] = req.body[update];
        })
        await task.save()

        res.send(task)
    } catch (e) {

        res.status(400).send(e);
    }
})


taskRouter.delete('/getTask/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        // const task = await Task.findByIdAndDelete(_id)
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send({ error: "No such task found" })
        }
        res.send(task)
    } catch (e) {

        res.status(500).send(e)
    }
})

module.exports = taskRouter; 