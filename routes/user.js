const express = require('express')

const {loginUser,signupUser} = require('../controllers/userController')

const router = express.Router()


router.post('/login',loginUser)

// router.post('/login',loginNew)

router.post('/signup',signupUser)

module.exports = router