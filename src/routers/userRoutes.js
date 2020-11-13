const express = require('express');
require('../db/mongoose')
const User = require('../models/users');

const userRouter =new express.Router();
userRouter.use(express.json());
// userRouter.get('/test',(req,res)=>{
//     res.send("success");
// })

userRouter.post('/AddUsers', async (req, res) => {
    // console.log(req.body);
    const user = new User(req.body)
    try {

        await user.save()
        res.send(user);
    }
    catch(error) {
        res.status(400).send(error);
    }

})

userRouter.get('/getUser/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send({error : "No such user found"})
        }
        res.send(user)
    } catch (e) {

        res.status(500).send(e)
    }
})


userRouter.get('/getAllUsers', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)

    } catch (error) {
        res.status(500).send(error)
    }
})



userRouter.patch('/getUser/:id', async (req, res) => {
    console.log(req.body);
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','email','password','age'];
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })
    if (!isValidOperation) {
        return res.status(400).send({error:"invalid updates"})
    }
    try {
        const _id = req.params.id;
        const user = await User.findOneAndUpdate(_id,req.body,{new :true, runValidators:true});
        if (!user) {
            return res.status(404).send({error : "No such user found"});
        }
        res.send(user)
    } catch (e) {

        res.status(400).send(e) ;
    }
})



userRouter.delete('/getUser/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send({error:"No such user found"})
        }
        res.send(user)
    } catch (e) {

        res.status(500).send(e)
    }
})


module.exports = userRouter;