const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

// @description
// @route           GET /leaderboard
router.get('/', ensureAuth, (req, res) => {
  res.render('leaderboard/index')
})

module.exports = router
