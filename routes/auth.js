// import our server
const express = require('express');
const passport = require('passport');

// connect routher to server
const router = express.Router();

// @description     Auth w Google
// @route           GET /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// @description     Callback
// @route           GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect:'/'}),
    (req, res) => {
    res.redirect('/home');
})

// @description     Logout user
// @route           /auth/logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;
