const express = require('express');

const userRoutes = require('./routers/userRoutes')
const taskRoutes = require('./routers/taskRoutes')
// require('../src/db/mongoose')
// const Task = require('../src/models/tasks');

const app = express();
const port = process.env.PORT || 3000;

app.use(userRoutes);
app.use(taskRoutes);
app.use(express.json())


// app.post('/AddTask', async (req, res) => {
//     console.log(req.body);
//     const task = new Task(req.body)
//     try {

//         await task.save()
//         res.send(task);
//     }
//     catch(error) {
//         res.status(400).send(error);
//     }

// })

app.listen(port, () => {
    console.log("server is up and running on port :", port);
})