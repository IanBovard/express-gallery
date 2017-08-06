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

router.get('/', (req, res) => {
  if (!req.user) { return res.render('users/index'); }
  if (req.user) {
    let username = req.user.username;
    return Users.findOne( {where: { username: username}})
    .then(user => {
      return res.render('users/index', { username: username});
    }).catch(err => {
      return res.send(400, err.message);
    });
  }
});

router.get('/userlist', (req, res) => {
  return Users.findAll().then(users => {
    if (!req.user) { return res.render('users/userlist', { users: users });}
    if(req.user) { return res.render('users/userlist', { authUsers: users});}
  }).catch(err => {
    return res.send(400, err.message);
  });
});

module.exports = router;