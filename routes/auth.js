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
  successRedirect: `/Kirk`,
  failureRedirect: '/main/login'
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
        passport.authenticate('local', {
          successRedirect: '/:username',
          failureRedirect: '/main/login'});
        })
        .catch(err => {
          return res.send(400, err.message);
        });
      });
    });
  });

  module.exports = router;