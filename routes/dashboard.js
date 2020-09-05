const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const Task = require('../models/Task');

// @description
// @route           GET /dashboard
router.get('/', ensureAuth, async (req, res) => {
  try {
    const alltasks = await Task.find({ user: req.user.id}).populate('user')
    res.render('dashboard/index', {
      alltasks
    });
  } catch (err) {
    console.error(err)
  }
})

// @description     'Read More'
// @route           GET /dashboard/view/:id
router.get('/view/:id', ensureAuth, async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id
  }).lean()
  res.render('dashboard/viewstory', {
    task
  })
})

// @description
// @route           GET /dashboard/showpublic
router.get('/showpublic', ensureAuth, async (req, res) => {
  try {
    const publictasks = await Task.find({ user: req.user.id, privacy: 'public'}).lean()
    res.render('dashboard/showpublic', {
      publictasks
    });
  } catch (err) {
    console.error(err)
  }
})

// @description
// @route           GET /dashboard/showprivate
router.get('/showprivate', ensureAuth, async (req, res) => {
  try {
    const privatetasks = await Task.find({ user: req.user.id, privacy: 'private'}).lean()
    res.render('dashboard/showprivate', {
      privatetasks
    });
  } catch (err) {
    console.error(err)
  }
})

// @description     'Edit'
// @route           GET /dashboard/:id/edit
router.get('/:id/edit', ensureAuth, async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id
  }).lean()
  res.render('dashboard/editstory', {
    task
  })
})

// @description     Add a new story
// @route           GET /dashboard/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('dashboard/addstory')
})

// @description     Process add task form
// @route           POST /dashboard
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Task.create(req.body)
    res.redirect('/dashboard')
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
