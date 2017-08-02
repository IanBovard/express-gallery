/* jshint esversion:6*/
const express = require('express');
const exphbs = require ('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 8080;
const userRoutes = require('./routes/users');
const galleryRoutes = require('./routes/gallery');

let db = require('./models');

const app = express();
const hbs = exphbs.create({
  defaultLayout :'main',
  extname : 'hbs'
});

app.use(express.static('public'));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
//middleware

app.use('/users', userRoutes);
app.use('/gallery', galleryRoutes);

app.get('/', (req, res) => {
  res.render('home/index');
});

app.listen(PORT, () => {
  db.sequelize.sync();
  console.log(`server running on ${PORT}`);
});