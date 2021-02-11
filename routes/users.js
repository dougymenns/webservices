//package imports
const { Router } = require('express')
const router = Router()
const multer = require('multer')
const usersControllers = require('../controller/users')
const verifyToken = require("../auth/index")
// const singleUpload = upload.single('file');

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



// router.get('/', verifyToken , usersControllers.getUsers)
router.post('/multer-upload', upload.array('file') , usersControllers.upload)
router.post('/upload', usersControllers.awsUpload);


module.exports = router
