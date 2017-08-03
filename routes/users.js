  /*jshint esversion:6*/
const express = require('express');
const router = express.Router();

let db = require('../models');
let Users = db.Users;

router.get('/', (req, res) => {
  return Users.findAll()
  .then(users => {
    res.render('users/index', { users: users });
  });
});

router.get('/create', (req, res) => {
  res.render('users/create');
});

router.post('/create', (req, res) =>{
  return Users.create( {username: req.body.username, password: req.body.password} )
  .then(users => {
    res.render('users/index', { users: users });
  }).catch(err => {
    res.send(err.message);
  });
});

module.exports = router;