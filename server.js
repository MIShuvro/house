const express = require('express'),
mongoose = require('mongoose'),
passport = require('passport'),
app = express()


require('dotenv').config()
app.use(passport.initialize())
app

/*
* ## Body parser
*/
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Mongodb Connection
mongoose.connect(process.env.DBPATH, {useNewUrlParser: true, useCreateIndex: true}).then(() => console.log('MongoDB is connected'))

/*
* ## Api Routes
*/
app.use('/api/auth', require('./routes/auth'))

/*
* PORT
*/
const PORT=process.env.PORT || 3333

app.listen(PORT,()=>{
    console.log(`Server is running on port is ${PORT}`);
    
})