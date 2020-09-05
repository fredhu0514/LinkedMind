const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const User = require('../models/User');

// @description
// @route           GET /leaderboard
router.get('/', ensureAuth, async (req, res) => {
  try {
    const allusers = await User.find().sort({ uscore: 'desc' }).lean()
    res.render('leaderboard/index', {
      allusers
    })
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
