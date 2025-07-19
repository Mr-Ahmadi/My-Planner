require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
/*__*/
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
/*__*/
const app = express() 

//add middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
})) 
app.use(cookieParser())
//add routers
app.use('/', indexRouter);
app.use('/user', userRouter);

const startServer = async _ => {
    try {
        // Set strictQuery explicitly to avoid the warning
        mongoose.set('strictQuery', false); // or true if you prefer strict schema compliance

        // Correct usage: URI first, then options
        await mongoose.connect(process.env.DB_URI, {
            // dbName: process.env.DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true, // add this to avoid another potential warning
        });

        app.listen(4000, _ => console.log('Server running on http://localhost:4000'));
    } catch (err) {
        console.log('Failed to connect database =>\n' + err);
    }
};

startServer();
