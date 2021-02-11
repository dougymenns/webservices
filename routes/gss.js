//package imports
const { Router } = require('express')
const router = Router()
const gssControllers = require('../controller/registration')


// router.get('/', verifyToken , usersControllers.getUsers)
router.post('/login', gssControllers.login);
router.post('/score', gssControllers.score);


module.exports = router
