/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const auth = require('../utilities/authenticate.js');
const passport = require('passport');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const { photoMetas } = require('../collections');
let db = require('../models');
let Users = db.Users;
let Gallery = db.Galleries;

//user routes -- /users/:username -- /user/:username/ -- /user/:username/:pictureId -- /users/:username/:pictureId/edit -- /users/:username/new -- /users/:username/:pictureId/delete

router.get('/:username', (req, res) => {
  let path = req.params.username;
  return Users.findOne( { where: { username: path }})
  .then(user => {
    return Gallery.findAll( { where: { user_id: user.id}})
    .then(gallery => {
      if (!req.user || req.user.username !== path) {
        return res.render('gallery/index', { gallery: gallery, user: user});}
        else if (req.user.username === path) { return res.render('gallery/index', { gallery: gallery, authUser: user });}
      })
    .catch(err => {
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
  return Users.findOne( { where: { username: path }})
  .then(user => {
    return Gallery.findById(pathId).then(picture => {
      if (!req.user || req.user.username !== path) {
        return res.render('gallery/picture', { picture: picture, user: user});}
        else if (req.user.username === path) { return res.render('gallery/picture', { picture: picture, authUser: user });}
      })
    .catch(err => {
      res.send(400, err.message);
    });
  });
});

router.post('/:username/new', auth.isAuthenticated, (req, res) => {
  if( !req.body.meta ) req.body.meta = { meta : "is working" };
  let path = req.params.username;
  if (req.user.username === path){
    let name = req.user.username;
    return Gallery.create( {
      user_id: req.user.id,
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    }).then(picture => {
      req.body.meta.pictureId = picture.id;
      return photoMetas().insert(req.body.meta);
    })
    .then(picture => {
      console.log(picture);
      return res.redirect(`/users/${name}`);
    })
    .catch(err => {
      return res.send(400, err.message);
    });
  }
});

router.put('/:username/:pictureId/edit', auth.isAuthenticated, (req, res) => {
  let path = req.params.username;
  let pathId = req.params.pictureId;
  if (req.user.username === path){
    let name = req.user.username;
    return Gallery.findById(pathId).then(picture => {
      picture.update( {
        author: req.body.author,
        link: req.body.link,
        description: req.body.description
      });
      return picture;
    }).then(picture => {
      res.redirect(`/users/${name}/${pathId}`);
    }).catch(err => {
      res.send(400, err.message);
    });
  }
});

router.delete('/:username/:pictureId/delete', auth.isAuthenticated, (req, res) => {
  let path = req.params.username;
  let pathId = req.params.pictureId;
  if (req.user.username === path){
    let name = req.params.username;
    return Gallery.findById(pathId).then(picture => {
      picture.destroy();
      return res.redirect(`/users/${name}`);
    }).catch(err => {
      res.send(400, err.message);
    });
  }
});
module.exports = router;