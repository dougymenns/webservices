const { Router } = require('express')
const usersControllers = require('../controller/users')
const router = Router()
const verifyToken = require("../auth/index")

router.post('/register', usersControllers.register)
router.post('/login', usersControllers.login)
router.post('/checkToken', verifyToken.authUser, usersControllers.checkToken)

module.exports = router