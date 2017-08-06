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

//user routes -- /users/:username -- /user/:username/ -- /user/:username/:pictureId -- /users/:username/:pictureId/edit -- /users/:username/new -- /users/:username/:pictureId/delete

router.get('/:username', (req, res) => {
  let path = req.params.username;
  return Users.findOne( { where: { username: path }}).then(user => {
    return Gallery.findAll( { where: { user_id: user.id}}).then(gallery => {
      if (!req.user || req.user.username !== path) {
        return res.render('gallery/index', { gallery: gallery, user: user});}
        else if (req.user.username === path) { return res.render('gallery/index', { gallery: gallery, authUser: user });}
      }).catch(err => {
        res.send(400, err.message);
      });
    });
});

router.get('/:username/new', (req, res) => {
  let path = req.params.username;
  if (req.user.username === path){
    let name = req.user.username;
    return res.render('gallery/new', { user: name});
  }
});

router.get('/:username/:pictureId/edit', (req, res) => {
  let path = req.params.username;
  let pathId = req.params.pictureId;
  if (req.user.username === path){
    let name = req.user.username;
    return Gallery.findById(pathId).then(picture => {
      res.render('gallery/edit', { picture: picture, user: name});
    }).catch(err => {
      res.send(400, err.message);
    });
  }
});

router.get('/:username/:pictureId', (req, res) => {
  let path = req.params.username;
  let pathId = req.params.pictureId;
  return Users.findOne( { where: { username: path }}).then(user => {
    return Gallery.findById(pathId).then(picture => {
      if (!req.user || req.user.username !== path) {
        return res.render('gallery/picture', { picture: picture, user: user});}
        else if (req.user.username === path) { return res.render('gallery/picture', { picture: picture, authUser: user });}
      }).catch(err => {
        res.send(400, err.message);
      });
    });
});

/*app.post('/:username/new', auth.isAuthenticated, (req, res) => {

});*/
module.exports = router;