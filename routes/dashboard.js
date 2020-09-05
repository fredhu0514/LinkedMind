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
      alltasks,
      userId: req.user.id
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
  }).populate('user')
  res.render('dashboard/viewstory', {
    task,
    userId: req.user.id
  })
})

// @description
// @route           GET /dashboard/showpublic
router.get('/showpublic', ensureAuth, async (req, res) => {
  try {
    const publictasks = await Task.find({ user: req.user.id, privacy: 'public'}).lean()
    res.render('dashboard/showpublic', {
      publictasks,
      userId: req.user.id
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
      privatetasks,
      userId: req.user.id
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
    task,
    userId: req.user.id
  })
})

// @description     Add a new task
// @route           GET /dashboard/add
router.get('/add', ensureAuth, (req, res) => {
  res.render('dashboard/addstory', {
    userId: req.user.id
  })
})

// @description     Delete a task
// @route           DELETE /dashboard/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id }, function(err, result) {
      if (err) {
        console.error(err);
      } else {
        res.redirect('/dashboard')
      }
    });
  } catch (err) {
    console.error(err);
  }
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

// @description     Update existed stories
// @route           POST /dashboard/:id
router.put('/:id', ensureAuth, async (req, res) => {
  let task = await Task.findById(req.params.id).lean()

  if (!task) {
    console.err();
  }

  if (task.user != req.user.id) {
    res.redirect('/dashboard')
  } else {
    console.log(req.body)
    task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true
    })
    res.redirect('/dashboard')
  }
})

module.exports = router
