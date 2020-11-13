//package imports
const { Router } = require('express')
const router = Router()

//local imports
const employerController = require('../controller/employer/profile')
const jobsController = require('../controller/employer/jobs')

router.post('/create' , employerController.createProfile)
router.post('/post' , jobsController.postJob)
router.get('/', employerController.getProfile)
router.get('/job', jobsController.getJob)
router.get('/jobs', jobsController.getJobs)


module.exports = router