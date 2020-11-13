const mongoose = require('mongoose');
const validator = require('validator');


const User = mongoose.model('User', {
   name:{
       type:String,
       required:true,
       trim:true  
   },
   email:{
       type:String,
       trim:true,
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
   }
});




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
