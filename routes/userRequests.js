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

//user routes -- /users/:username -- /user/:username/gallery -- /user/:username/galery/:pictureId -- /users/:username//gallery/:pictureId -- /users/:username/gallery/new


router.get('/:username', (req, res) => {
  let path = req.params.username;
  return Users.findOne( { where: { username: path }}, { raw: true }).then(user => {
    if (!req.user.username) { res.render('gallery/index', { user: user});}
    if (req.user.username !== path) { res.render('gallery/index', { user: user });}
    if (req.user.username === path) { res.render('gallery/index', { user: user });}
  });
});



/*router.get('/:username', (req, res) => {
  if (!req.user) { res.render('gallery/index'); }
  if (req.user) {
    let username = req.user.username;
    let path = req.params.username;
    if (username !== path) { res.render('gallery/index'); }
    if (username === path) {
      return Users.findOne( { where: { username: username }}, { raw: true }).then(user => {
        res.render('gallery/index', { user: user});
      });
    }
  }
});
*/
module.exports = router;