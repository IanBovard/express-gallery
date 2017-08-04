/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const auth = require('../utilities/authenticate.js');
const passport = require('passport');
const saltRounds = 10;
const bcrypt = require('bcrypt');

let db = require('../models');
let Users = db.Users;
let Gallery = db.Galleries;

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/main/login');
});

router.get('/register', (req, res) => {
  if (req.user){res.redirect('/users');
}else{
  res.render('auth/register');
}
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/users',
  failureRedirect: '/login',
}));


router.post('/register', (req, res) => {
  let { username, password } = req.body;
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      Users.create({
        username: username,
        password: hash
      })
      .then( (user) => {
        res.redirect('/gallery');
      })
      .catch(err => {
        return res.sent('Stupid Username');
      });
    });
  });
});

module.exports = router;