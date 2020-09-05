const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Task = require('../models/Task');

// @description
// @route           GET /forum
router.get('/', ensureAuth, async (req, res) => {
  try {
    const tasks = await Task.find({ privacy: 'public' }).populate('user').sort({ createdAt: 'desc' }).lean() // sorting based on createdAt
    res.render('forum/index', {
      tasks
    });
  } catch (err) {
    console.error(err)
  }
})

// @description
// @route           GET /forum/:id
router.get('/:id', ensureAuth, async (req, res) => {

})

// @description
// @route           GET /forum/user/:id
router.get('/user/:id', ensureAuth, async (req, res) => {

})

module.exports = router
