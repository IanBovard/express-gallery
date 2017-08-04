  /*jshint esversion:6*/
  const express = require('express');
  const router = express.Router();
  const auth = require('../utilities/authenticate.js');

  let db = require('../models');
  let Users = db.Users;

  router.get('/:username', auth.isAuthenticated, (req, res) => {
    if (req.user.dataValues.username === req.params.username){
      return Users.findOne( { where: { username: req.user.dataValues.username }}, { raw: true })
      .then(user => {
        console.log(user.username);
        res.render(`users/index`, { user: user });
      });
    }else{
      res.send(400, "You don't have access to that profile or is doesnt exist!");
    }
  });
  module.exports = router;