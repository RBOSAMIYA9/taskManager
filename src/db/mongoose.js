const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// C:\Users\rb23\mongoDb\bin> .\mongod.exe --dbpath=C:/Users/rb23/mongoDb-data
