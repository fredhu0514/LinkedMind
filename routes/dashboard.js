const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

// @description
// @route           GET /dashboard
router.get('/', ensureAuth, (req, res) => {
  res.render('dashboard/index')
})

module.exports = router
