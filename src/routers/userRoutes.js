const express = require('express');
const { update } = require('../models/users');
require('../db/mongoose')
const User = require('../models/users');
const auth = require('../middleware/auth');
const sharp = require('sharp');
const {sendWelcomeEmail} = require('../email/account');
const {cancellationEmail} = require('../email/account');


const multer = require('multer');
const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        // console.log(req);
        if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/))
        {
            console.log("unknown file");
            return cb(new Error('please upload jpg,png,jpeg file'))
        }
        cb(undefined,true)
    }
}) 



const userRouter = new express.Router();
userRouter.use(express.json());


userRouter.post('/users/me/avatar',auth,upload.single('avatar'),async (req,res)=>{
    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer;
    // req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
},(error,req,res,next)=>{
    res.status(400).send({error: error.message})
})

userRouter.delete('/users/me/avatar',auth,async (req,res)=>{
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
},(error,req,res,next)=>{
    res.status(400).send({error: error.message})
})

userRouter.get('/users/:id/avatar',async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar){
            throw new Error();
        }
        res.set('Content-Type','image/png');
        res.send(user.avatar);
    } catch (error) {
        res.set(404).send();
    }
})


userRouter.post('/AddUsers', async (req, res) => {
    // console.log(req.body);
    const user = new User(req.body);
    // console.log(user);
    try {

        await user.save();
        sendWelcomeEmail(user.email,user.name);
        const token = await user.generateAuthToken();
        const userProfile = await  user.getPublicProfile()
        res.status(201).send({ user:userProfile, token });
    }
    catch (error) {
        res.status(400).send(error);
    }

})


userRouter.get('/user/me', auth, async (req, res) => {

    try {
        const userProfile = await req.user.getPublicProfile()
        res.send(userProfile)

    } catch (error) {
        res.status(500).send(error)
    }
})


//update user
userRouter.patch('/user/me', auth,async (req, res) => {
    // console.log(req.body);
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })
    if (!isValidOperation) {
        return res.status(400).send({ error: "invalid updates" })
    }
    try {
       

        updates.forEach((update) => {
            req.user[update] = req.body[update];
        })
        await req.user.save()
        const userProfile = await req.user.getPublicProfile()
        res.send(userProfile)
    } catch (e) {

        res.status(400).send(e);
    }
})



userRouter.delete('/user/me',auth, async (req, res) => {
    const _id = req.params.id
    try {
        cancellationEmail(req.user.email,req.user.name)
        await req.user.remove()
        res.send(req.user)
    } catch (e) {

        res.status(500).send(e)
    }
})

userRouter.post('/user/logout', auth, async (req, res) => {
    try {
        console.log("logout");
        console.log(req.user.tokens.length);
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        console.log(req.user.tokens.length);

        await req.user.save()
        res.send({ status: "logged out" })

    } catch (error) {
        res.status(500).send();
    }

})

userRouter.post('/user/logoutAll', auth, async (req, res) => {
    try {
        console.log("logoutAll");
        req.user.tokens=[];
        await req.user.save()
        res.status(200).send({ status: "logged out from all" })

    } catch (error) {
        res.status(500).send();
    }

})


userRouter.post('/user/login', async (req, res) => {
    try {
        console.log("user login");
        const user = await User.findByCredentials(req.body.email, req.body.password);
        // console.log(user);
        const token = await user.generateAuthToken();
        // console.log(user,token);
        userDetail = await user.getPublicProfile();
        return res.send({userDetail,token});
    } catch (error) {
        res.status(400).send(error);
    }

})




module.exports = userRouter;