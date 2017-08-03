/* jshint esversion:6*/
const express = require('express');
const exphbs = require ('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 8080;

const userRoutes = require('./routes/users');
const galleryRoutes = require('./routes/gallery');
const authRoutes = require('./routes/auth');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

let db = require('./models');
let Users = db.Users;

const app = express();
const hbs = exphbs.create({
  defaultLayout :'main',
  extname : 'hbs'
});

app.use(express.static('public'));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUnititalized: false
}));

passport.use(new LocalStrategy((username, password, done) => {
  Users.findOne({where: { username: username} }).then(user => {
    if (user === null) {
      return done(null, false, { message: 'Incorrect username'});
    }
    if (user.password !== password){
      return done(null, false, {message: 'Incorrect password'});
    }
    return done(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((userId, cb) => {
  Users.findById(userId).then(user =>{
    cb(null, user);
  });
});

app.use('/users', userRoutes);
app.use('/gallery', galleryRoutes);
app.use('/', authRoutes);


app.listen(PORT, () => {
  db.sequelize.sync();
  console.log(`server running on ${PORT}`);
});
