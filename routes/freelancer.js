//package imports
const { Router } = require('express')
const router = Router()

//local imports
const freelancerController = require('../controller/freelancer/profile')

router.post('/create' , freelancerController.createProfile)
router.get('/', freelancerController.getProfile)


module.exports = router