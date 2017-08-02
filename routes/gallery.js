/*jshint esversion:6*/
const express = require('express');
const router = express.Router();

let db = require('../models');
let Gallery = db.Galleries;

router.get('/', (req, res) => {
  return Gallery.findAll({raw:true})
  .then(pictures => {
    res.render('gallery/index', { gallery: pictures });
  })
  .catch(err => {
   res.send(err.message);
 });
});

router.get('/new', (req, res) => {
  res.render('gallery/new');
});

router.get('/:id/edit', (req, res) => {
  let id = req.params.id;
  return Gallery.findById(id, {raw:true})
  .then(picture => {
    if (picture !== null){
      res.render('gallery/edit', picture);
    }else{
      res.send(404, 'Page Not Found');
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
    if (picture !== null){
      res.render('gallery/picture', picture);
    }else{
      res.send(404, 'Page Not Found');
    }
  })
  .catch(err => {
    res.send(err.message);
  });
});

router.post('/', (req, res) => {
  return Gallery.create({ user_id: 1, author: req.body.author, link: req.body.link, description: req.body.description })
  .then(picture => {
    res.redirect('/gallery');
  })
  .catch(err => {
    res.send(err.message);
  });
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  return Gallery.findById(id)
  .then(picture => {
    if (picture !== null){
      console.log(picture);
      picture.update( {author: req.body.author, link: req.body.link, description: req.body.description });
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

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  return Gallery.findById(id)
  .then(picture => {
    console.log(picture);
    picture.destroy();
    return picture;
  })
  .then(picture => {
    if (picture !== null){
      res.redirect('/gallery');
    }
  })
  .catch(err => {
    res.send(404, 'Page Not Found');
  });
});

module.exports = router;