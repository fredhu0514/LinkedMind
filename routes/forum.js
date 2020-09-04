const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

// @description
// @route           GET /forum
router.get('/', ensureAuth, (req, res) => {
  res.render('forum/index')
})

module.exports = router
