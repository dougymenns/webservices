const { Router } = require('express')
const usersControllers = require('../controller/users')
const router = Router()

router.post('/register', usersControllers.register)
router.post('/login', usersControllers.login)

module.exports = router