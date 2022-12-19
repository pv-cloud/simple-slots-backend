const express = require('express')

const {addScore, getScores, updateScore, getMyScore} = require('../controllers/scoreController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

router.post('/',updateScore)

router.get('/',getScores)
router.get('/my-score',getMyScore)

// router.patch('/',updateScore)

module.exports = router
