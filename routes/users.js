  /*jshint esversion:6*/
  const express = require('express');
  const router = express.Router();
  const auth = require('../utilities/authenticate.js');

  let db = require('../models');
  let Users = db.Users;

  router.get('/', (req, res) => {
    return Users.findAll()
    .then(users => {
      res.render('users/index', { users: users });
    });
  });
  module.exports = router;