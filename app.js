//external packages
const express = require("express")
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const morgan = require('morgan')

//local imports
const sequelize = require('./util/database')
const authRoute = require('./routes/auth')
const usersroutes = require('./routes/users')
const freelancerroutes = require('./routes/freelancer')
const employerroutes = require('./routes/employer')

//env and express initialization
dotenv.config()
const app = express()

//body-parser middleware
app.use(bodyParser.json())



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

//routes
app.use('/api/auth', authRoute)
app.use('/api/users', usersroutes)
app.use('/api/freelancer', freelancerroutes)
app.use('/api/employer', employerroutes)



//postgres db connection
try {
    sequelize.authenticate()
} catch (e) {
    console.log(e)
}

//server listening
app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
})