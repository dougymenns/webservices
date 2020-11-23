//package imports
const { Router } = require('express')
const router = Router()
const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const {originalname}=file
      cb(null, originalname)
    }
  })
   

const upload = multer({storage})

//local imports
const usersControllers = require('../controller/users')
const verifyToken = require("../auth/index")

router.get('/', verifyToken , usersControllers.getUsers)
router.post('/upload', upload.array('file') , usersControllers.upload)


module.exports = router
