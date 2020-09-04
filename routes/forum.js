const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Task = require('../models/Task');

// @description
// @route           GET /dashboard
router.get('/', ensureAuth, async (req, res) => {
  try {
    const tasks = await Task.find({ privacy: 'public' }).populate('user')
    res.render('forum/index', {
      tasks
    });
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
