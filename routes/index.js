const express = require('express')
const router = express.Router()

// @description     Login/Landing page
// @route           GET /
router.get('/', (req, res) => {
  //res.render('index')
  res.render('login', {
    layout: 'login',
  })
})

module.exports = router
