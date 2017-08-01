/*jshint esversion:6*/
const express = require('express');
const router = express.Router();

let db = require('../models');
let Pictures = db.Pictures;

router.get('/', (req, res) =>{
  return Pictures.findAll()
  .then(pictures => {
    res.render('pictures/index', { pictures: pictures });
  });
});


module.exports = router;