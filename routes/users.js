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

router.get('/:user', (req, res) => {
  if (req.isAuthenticated){res.redirect}
});

  router.get('/create', (req, res) => {
    if (req.isAuthenticated){res.redirect('/users');
  }else{
    res.render('users/create');
  }
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