/* jshint esversion:6*/
const express = require('express');
const exphbs = require ('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 8080;
const userRoutes = require('./routes/users');
const galleryRoutes = require('./routes/gallery');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

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
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUnititalized: false
}));

passport.use(new LocalStrategy((username, password, done) => {
  Users.findUser({ username: username }, (err,user) => {
    if (err) {return done(err); }
    //check if user is in database
    //if nothing gets passed into user, undefined === falsy === !user
    if (!user) {
      //first argument is an error obj and is therefore null here
      return done(null, false, { message: 'Incorret username' });
    }
    //check if have right password
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password'});
    }
    //success case
    return done(null, user);
  });
}));

// //fetches the user and presents it to be referenced later on OR doesn't find in database and throws an error
// passport.deserializeUser((userId, cb) => {
//   //our model and a method -- can be any method to retrieve the
//   Users.findById(userId, cb);
// });

app.use(passport.initialize());

// passport.serializeUser((user, cb) => {
//   cb(null, user.id);
// });

app.use('/users', userRoutes);
app.use('/gallery', galleryRoutes);

app.get('/', (req, res) => {
  res.render('home/index');
});

// app.post('/login', passport.authenticate( 'local', {
//   successRedirect: '/secret',
//   failureRedirect: 'login.html'
// }));

// app.get('/logout', (req, res) => {
//   req.logout();
//   res.redirect('/login.html');
// });

app.listen(PORT, () => {
  db.sequelize.sync();
  console.log(`server running on ${PORT}`);
});