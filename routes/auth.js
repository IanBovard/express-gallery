/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const auth = require('../utilities/authenticate.js');
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/gallery',
  failureRedirect: '/login',
}));

module.exports = router;