const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { deleteOne } = require('./tasks');
const Task = require('./tasks')


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true  
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
             if(!validator.isEmail(value)){
                 throw new Error("Email is invalid");
             } 
        }
    },
    age:{
        type:Number,
        trim:true,
        validate(value){
            if(value<0){
                throw new Error("Age can not be negative")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password'))
            {
                throw new Error("password should not be password")
            }
 
        }
    },
    avatar:{
        type:Buffer
    },
    tokens:[{
        token:{
            type: String,
            required:true
        }
    }]
 },{
     timestamps:true
 })

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
    user.tokens=user.tokens.concat({token:token});
    await user.save();
    return token;
}
userSchema.methods.getPublicProfile =async function(){
    // console.log("called get public profile");
    const user = this;
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.tokens;
    delete userObj.avatar;
    // console.log("userObj ",userObj);

    return userObj;
}
userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email : email});
    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password,user.password); 
    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}


 // hash the plain text
userSchema.pre('save',async function(next){
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

userSchema.pre('remove',async function(next){
    const user =this;
    await Task.deleteMany({owner:user._id})
    next();
})
const User = mongoose.model('User',userSchema);




module.exports =  User



// const user = new User({
//     name:"Ravindra",
//     email:"rbosamiya9@gmail.com",
//     age:21,
//     password:"aaaaPASSWORD"
// });

// user.save().then((result) => { 
//     console.log(result); 
// }).catch((error) => {
//      console.log("error occured", error); 
//     });
