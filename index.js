// imports
const express = require('express')

// initialize express
const app = express()

// connect to db
require('./config/db')()

// middleweres
app.use(express.urlencoded({ extended: false }))
app.use('/auth', require('./routes/auth'))
app.use('/products', require('./routes/products'))

// main page
app.get('/', (req,res)=>{

})

// listen
app.listen(1000, () => console.log("port 1000's up"))
