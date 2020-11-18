const jwt = require('jsonwebtoken');
const { findOne } = require('../models/users');
const User = require('../models/users');

const auth = async (req,res,next)=>{
    try{
        // console.log("dummy ",req.header('Authorization'));
        // console.log("hello");
        const token = req.header('Authorization').replace('Bearer','').trim();
        // console.log(token);
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findOne({_id:decode._id,'tokens.token':token});
        if(!user){
            throw new Error();
        }
        req.user=user;
        req.token=token;
        next();

    }
    catch(e){
        res.status(401).send({error:"Please authenticate"});
    }
   
}

module.exports = auth 