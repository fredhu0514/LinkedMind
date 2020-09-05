const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

// @description
// @route           GET /home
router.get('/', ensureAuth, (req, res) => {
  res.render('home', {
    layout: 'home',
    userId: req.user.id
  })
})

module.exports = router
