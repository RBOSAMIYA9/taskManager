const express = require('express');
const userRoutes = require('./routers/userRoutes');
const taskRoutes = require('./routers/taskRoutes');

const app = express();
const port = process.env.PORT || 3000;


app.use(userRoutes);
app.use(taskRoutes);
app.use(express.json())

app.listen(port, () => {
    console.log("server is up and running on port :", port);
})