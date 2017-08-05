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

router.get('/userlist', (req, res) => {
  res.render('users/userlist');
});

module.exports = router;