require('../src/db/mongoose');
const Task = require('../src/models/tasks');

Task.findByIdAndDelete('5fabcb49cea2b40e2cb97180').then(()=>{
    return Task.findOne({completed : false})
}).then((task)=>{
    console.log(task);
}).catch((e)=>{
    console.log("error",e);
})