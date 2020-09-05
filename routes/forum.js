const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const User = require('../models/User');
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

// @description     'Read More'
// @route           GET /forum/view/:id
router.get('/view/:id', ensureAuth, async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id
  }).populate('user')
  res.render('forum/viewstory', {
    task
  })
})

// @description
// @route           GET /forum/user/:id
router.get('/user/:id', ensureAuth, async (req, res) => {
  const user = await User.findOne({
    _id: req.params.id
  }).lean()
  const alltasks = await Task.find({ privacy: 'public', user: req.user.id }).sort({ createdAt: 'desc' }).lean()
  res.render('forum/viewuser', {
    user,
    alltasks
  })
})

module.exports = router
