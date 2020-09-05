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
      tasks,
      userId: req.user.id
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
    task,
    userId: req.user.id
  })
})

// @description
// @route           GET /forum/user/:id
router.get('/user/:id', ensureAuth, async (req, res) => {
  const user = await User.findOne({
    _id: req.params.id
  }).lean()
  const alltasks = await Task.find({ privacy: 'public', user: req.params.id }).sort({ createdAt: 'desc' }).limit(5).lean()
  
  let userName;
  if (user.displayName === req.user.displayName) {
    userName = "My "
  } else {
    userName = user.displayName + ", "
  }
  res.render('forum/viewuser', {
    user,
    alltasks,
    userName,
    userId: req.user.id
  })
})

// @description     add one point for task
// @route           POST /forum/:uid/:tid
router.post('/:uid/:tid', ensureAuth, async (req, res) => {
  let user = await User.findById(req.params.uid).lean()
  let task = await Task.findById(req.params.tid).lean()

  user = await User.findOneAndUpdate({ _id: req.params.uid},
    {
      uscore: user.uscore + 1
    },
    {
      new: true,
      runValidators: true
    }
  );

  task = await Task.findOneAndUpdate({ _id: req.params.tid},
    {
      tscore: task.tscore + 1
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.redirect('/forum')
})

module.exports = router
