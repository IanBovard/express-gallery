/*jshint esversion:6*/
const express = require('express');
const router = express.Router();

let db = require('../models');
let Pictures = db.Pictures;

router.get('/', (req, res) => {
  return Pictures.findAll({raw:true})
  .then(pictures => {
    console.log({pictures: pictures});
    res.render('pictures/index', { pictures: pictures });
  });
});

router.get('/:id', (req, res) => {
  let id = req.params.id;
  return Pictures.findById(id)
  .then(picture => {
    console.log(picture.dataValues);
    //res.render('pictures/picture', { picture: picture });
  })
})

router.post('/', (req, res) => {
  return Pictures.create({ user_id: 1, author: req.body.author, link: req.body.link, description: req.body.description })
  .then(picture => {
    //console.log(picture);
    res.redirect('pictures/index')
  });
});

router.post('/:id', (req, res) => {
  let id = req.params.id;
  return Pictures.findById(id)
  .then(picture => {
    //console.log(picture);
    picture.update( {author: req.body.author, link: req.body.link, description: req.body.description })
    return picture;
  })
  .then(picture => {
    res.redirect('pictures/index')
  })

});

module.exports = router;