//package imports
const { Router } = require('express')
const router = Router()

//local imports
const usersControllers = require('../controller/users')
const verifyToken = require("../auth/index")

router.get('/', verifyToken , usersControllers.getUsers)


module.exports = router