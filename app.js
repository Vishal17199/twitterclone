require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000 
const database = require('./database')
var bodyParser = require('body-parser')
const morgan = require('morgan')

//mongoose modals
require('./modal/user')
require('./modal/post')

// use bodyparser to get data from body in json format
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

//routes
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

app.use(morgan('dev'))

//all request will go here 
if (process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


//just for testing , no use 
app.get('/', (req, res) => {
    res.json("working")
})

app.listen(PORT, () => {
    console.log("server is running")
})