/*jshint esversion:6*/
const express = require('express');
const router = express.Router();
const auth = require('../utilities/authenticate.js');

let db = require('../models');
let Gallery = db.Galleries;
let User = db.Users;

router.get('/:username/gallery', auth.isAuthenticated, (req, res) => {
  if (req.user.username === req.params.username){
    return Gallery.findAll( {where: {user_id: req.user.id}},{ raw: true })
    .then(pictures => {
      let username = req.user.username;
      res.render('gallery/index', { gallery: pictures, username: username });
    })
    .catch(err => {
     res.send(400, err.message);
   });
  }else{
    res.send(400, "Bad request");
  }
});

router.get('/:username/gallery/new', auth.isAuthenticated, (req, res) => {
  if (req.user.username === req.params.username){
    let username = req.user.dataValues.username;
    res.render('gallery/new', { username: username });
  }
});

router.get('/:username/gallery/:id',(req, res) => {
  let id = req.params.id;
  let username = req.user.username;
  return Gallery.findById(id, {raw:true})
  .then(picture => {
    if (picture !== null){
      res.render('gallery/picture', { picture: picture, username: username});
    }else{
      res.send(400, 'Bad Request');
    }
  })
  .catch(err => {
    res.send(400, err.message);
  });
});

router.get('/:username/gallery/:id/edit', auth.isAuthenticated, (req, res) => {
  if (req.user.username === req.params.username){
    let id = req.params.id;
    return Gallery.findById(id, {raw:true})
    .then(picture => {
      if (picture !== null){
        let username = req.user.username;
        console.log({ picture: [picture], username: [username] });
        res.render('gallery/edit', { picture: picture, username: username } );
      }else if(picture === null){
        console.log('here');
        res.send(400, 'Bad Request');
      }
    })
    .catch(err => {
      res.send(400, 'Didnt work');
    });
  }
});

router.post('/:username/gallery/new', auth.isAuthenticated, (req, res) => {
  if (req.user.username === req.params.username){
    return Gallery.create({ user_id: req.user.id, author: req.body.author, link: req.body.link, description: req.body.description })
    .then(picture => {
      res.redirect(`/${req.user.username}/gallery`);
    })
    .catch(err => {
      res.send(400, err.message);
    });
  }else{
    res.send(400, 'Bad Request');
  }
});

router.put('/:username/gallery/:id/edit', auth.isAuthenticated, (req, res) => {
  if (req.user.username === req.params.username){
    let id = req.params.id;
    let username = req.user.username;
    return Gallery.findById(id)
    .then(picture => {
      if (picture !== null){
        picture.update({author: req.body.author, link: req.body.link, description: req.body.description });
        return picture;
      }
    })
    .then(picture => {
      res.redirect(`/${req.user.username}/gallery/${id}`);
    })
    .catch(err => {
      res.send(400, err.message);
    });
  }else{
    res.send(400, 'Bad Request');
  }
});

router.delete('/:username/gallery/:id/delete', auth.isAuthenticated, (req, res) => {
  if (req.user.username === req.params.username){
    let id = req.params.id;
    return Gallery.findById(id)
    .then(picture => {
      picture.destroy();
      return picture;
    })
    .then(picture => {
      if (picture !== null){
        res.redirect(`/${req.user.username}/gallery`);
      }
    })
    .catch(err => {
      res.send(400, 'Bad Request');
    });
  }else{
    res.send(400, 'Bad Request');
  }
});

module.exports = router;