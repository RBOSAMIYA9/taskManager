const mongoose = require('mongoose');


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

// C:\Users\rb23\mongoDb\bin> .\mongod.exe --dbpath=C:/Users/rb23/mongoDb-data
