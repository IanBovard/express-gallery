/*jshint esversion:6*/
const express = require('express');
const router = express.Router();

let db = require('../models');
let Gallery = db.Galleries;

router.get('/', (req, res) => {
  return Gallery.findAll()
  .then(pictures => {
    res.render('gallery/index', { gallery: pictures });
  });
});

router.get('/new', (req, res) => {
  res.render('gallery/new');
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  return Gallery.findById(id)
  .then(picture => {
    res.render('gallery/picture', { gallery: pictures });
  });
});

router.get('/:id/edit', (req, res) => {
  let id = req.params.id;
  return Gallery.findById(id)
  .then(picture => {
    res.render('gallery/picture', { gallery: pictures });
  });
});

router.post('/', (req, res) => {
  return Gallery.create({ user_id: 1, author: req.body.author, link: req.body.link, description: req.body.description })
  .then(picture => {
    res.redirect('/gallery');
  });
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  return Gallery.findById(id)
  .then(picture => {
    picture.update( {author: req.body.author, link: req.body.link, description: req.body.description });
    return picture;
  })
  .then(picture => {
    res.redirect(`/gallery/${id}`);
  });
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  return Gallery.findById(id)
  .then(picture => {
    picture.destroy();
  });
});

module.exports = router;