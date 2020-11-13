//package imports
const { Router } = require('express')
const router = Router()

//local imports
const usersControllers = require('../controller/users')

router.get('/profile' , usersControllers.getUsers)


module.exports = router