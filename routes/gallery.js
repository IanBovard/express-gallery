/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const auth = require('../utilities/authenticate.js');

let db = require('../models');
let Gallery = db.Galleries;
let User = db.Users;

router.get('/', (req, res) => {
  return Gallery.findAll( {where: {user_id: req.user.id}},{ raw:true })
  .then(pictures => {
    res.render('gallery/index', { gallery: pictures });
  })
  .catch(err => {
   res.send(err.message);
 });
});

router.get('/new', auth.isAuthenticated, (req, res) => {
  res.render('gallery/new');
});

router.get('/:id/edit', auth.isAuthenticated, (req, res) => {
  let id = req.params.id;
  return Gallery.findById(id, {raw:true})
  .then(picture => {
    if (picture !== null){
      res.render('gallery/edit', picture);
    }else{
      res.send(400, 'Bad Request');
    }
  })
  .catch(err => {
    res.send(err.message);
  });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  return Gallery.findById(id, {raw:true})
  .then(picture => {
    console.log(picture);
    if (picture !== null){
      res.render('gallery/picture', picture);
    }else{
      res.send(400, 'Bad Request');
    }
  })
  .catch(err => {
    res.send(err.message);
  });
});

router.post('/new', auth.isAuthenticated, (req, res) => {
  return Gallery.create({ user_id: req.user.id, author: req.body.author, link: req.body.link, description: req.body.description })
  .then(picture => {
    res.redirect('/gallery');
  })
  .catch(err => {
    res.send(err.message);
  });
});

router.put('/:id', auth.isAuthenticated, (req, res) => {
  let id = req.params.id;
  return Gallery.findById(id)
  .then(picture => {
    if (picture !== null){
      picture.update({author: req.body.author, link: req.body.link, description: req.body.description });
      return picture;
    }
  })
  .then(picture => {
    res.redirect(`/gallery/${id}`);
  })
  .catch(err => {
    res.send(err.message);
  });
});

router.delete('/:id', auth.isAuthenticated, (req, res) => {
  let id = req.params.id;
  return Gallery.findById(id)
  .then(picture => {
    picture.destroy();
    return picture;
  })
  .then(picture => {
    if (picture !== null){
      res.redirect('/gallery');
    }
  })
  .catch(err => {
    res.send(400, 'Bad Request');
  });
});

module.exports = router;