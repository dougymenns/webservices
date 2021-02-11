//external packages imports
const express = require("express")
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const morgan = require('morgan')
const multer = require('multer')

//local modules imports
const sequelize = require('./util/database')
const authRoute = require('./routes/auth')
const usersoutes = require('./routes/users')
const gssroutes = require('./routes/gss')
const upload = multer({dest: 'uploads/'})

//env and express initialization
dotenv.config()
const app = express()
app.use(express.static('public'))

//body-parser middleware
app.use(bodyParser.json())


//allowing cors and other methods in express
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

//logging endpoint
app.use(morgan('dev'))

//extract the entire body portion of an incoming request stream and exposes it on req. body
app.use(bodyParser.urlencoded({ extended: false }))

//routes
app.use('/api/auth', authRoute)
app.use('/api/users', usersoutes)
app.use('/api/gss', gssroutes)



//postgres db connection
try {
    sequelize.authenticate()
} catch (e) {
    console.log(e)
}

//server listening(start)
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
})