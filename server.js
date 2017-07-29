/* jshint esversion:6*/
const express = require('express');
const exphbs = require ('express-handlebars');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

let db = require('./models');
let Users = db.Users;

const app = express();
const hbs = exphbs.create({
  defaultLayout :'main',
  extname : 'hbs'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.listen(PORT, () => {
  //db.sequelize.sync();
  console.log(`server running on ${PORT}`);
});