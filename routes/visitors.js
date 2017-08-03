  /*jshint esversion:6*/
  const express = require('express');
  const router = express.Router();
  const auth = require('../utilities/authenticate.js');

  let db = require('../models');
  let Users = db.Users;
  let Gallery = db.Galleries;

  router.get('/', (req, res) => {
    return Users.findAll({raw:true}).then(users => {
      res.render('visitor/index', { userlist: users });
    });
  });

  router.get('/:username', (req, res) => {
    return Users.findOne( { where: {username: req.params.username} })
    .then(user => {
      console.log(user);
      return Gallery.findAll( { where: {user_id: user.id} })
      .then(pictures => {
        res.render('visitor/galleries', {gallery: pictures});
      })
      .catch(err => {
        res.send(400, err.message);
      });
    });
  });

  module.exports = router;