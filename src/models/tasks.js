const mongoose = require('mongoose');

const taskSchema = mongoose.Schema( {
    description: {
        type: String,
        required:true,
        trim:true
    },
    completed: {
        type: Boolean,
        default:false
    },
    owner:{
        
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})
const Task = mongoose.model('Task',taskSchema);

module.exports = Task


// Task.insertMany([
//     {
//         description: "    collect mobile phone from flipkart 111  ",
//         completed: false
//     },
//     {
//         description: "    do node ",
//         completed: false
//     },
//     {
//         description: "    do eat ",
//         completed: false
//     }
// ]).then((result)=>{
//     console.log(result);
// }).catch((e)=>{
//     console.log("error: ",e);
// })

// const taskOne = new Task({
//     description: "    collect mobile phone from flipkart 111  ",
//     completed: false
// });

// taskOne.save().then((result) => { 
//     console.log(result); 
// }).catch((error) => {
//      console.log("error occured", error); 
//     });

// const taskTwo = new Task({
//     description: "    do node ",
//     completed: false
// });



// taskTwo.save().then((result) => { 
//     console.log(result); 
// }).catch((error) => {
//      console.log("error occured", error); 
//     });


// const task3 = new Task({
//     description: "    do eat ",
//     completed: false
// });



// task3.save().then((result) => { 
//     console.log(result); 
// }).catch((error) => {
//      console.log("error occured", error); 
//     });