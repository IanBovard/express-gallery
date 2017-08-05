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

//visitor routes -- / -- /userlist -- /login -- /register

router.get('/', (req, res) => {
  if (!req.user) { res.render('users/index'); }
  if (req.user) {
    let username = req.user.username;
    return Users.findOne( {where: { username: username}})
    .then(user => {
      res.render('users/index', { username: username});
    });
  }
});


router.get('/userlist', (req, res) => {
  return Users.findAll( {raw: true} ).then(users => {
    res.render('users/userlist', { users: users});

  });
});

module.exports = router;


/*router.get('/', (req, res) => {
  return Users.findOne ( { where: { username: username }},{ raw: true}).then(user => {
    if (!user) { res.render('users/index');}
    if (user) {
      let username = req.user.username;
      res.render('users/index', { username: username } );}
    });
});*/