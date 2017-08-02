  /*jshint esversion:6*/
const express = require('express');
const router = express.Router();

let db = require('../models');
let Users = db.Users;

router.get('/', (req, res) =>{
  return Users.findAll()
  .then(users => {
    res.render('users/index', { users: users });
  });
});

router.post('/', (req, res) =>{
  return Users.create( {username: "Bob", password: "sandwich"} )
  .then(users => {
    console.log(users);
    res.render('users/index', { users: users });
  }).catch(err => {
    res.send(400, err.message);
  });
});

module.exports = router;