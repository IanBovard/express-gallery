/* jshint esversion:6*/
const express = require('express');
const exphbs = require ('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 8080;

const userRoutes = require('./routes/userRequests');
const authRoutes = require('./routes/authorizeUser');
const visitorRoutes = require('./routes/visitorRequests');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const RedisStore = require('connect-redis')(session);
const saltRounds = 10;
const bcrypt = require('bcrypt');

let db = require('./models');
let Users = db.Users;

const app = express();
const hbs = exphbs.create({
  defaultLayout :'main',
  extname : 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use(session({
  store: new RedisStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUnititalized: false
}));

passport.use(new LocalStrategy (
  function(username, password, done) {
    Users.findOne({ where: { username: username } })
    .then ( user => {
      if (user === null) {
        return done(null, false, {message: 'bad username or password'});
      }
      else {
        bcrypt.compare(password, user.password)
        .then(res => {
          if (res) { return done(null, user); }
          else {
            return done(null, false, {message: 'bad username or password'});
          }
        });
      }
    })
    .catch(err => { console.log('error: ', err.mesage); });
  }
  ));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => {
  console.log('serializing');
  return cb(null, user.id);
});

passport.deserializeUser((userId, cb) => {
  console.log('deserializing');
  Users.findById(userId).then(user =>{
    return cb(null, user);
  });
});

app.use('/', authRoutes);
app.use('/', visitorRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
  db.sequelize.sync();
  console.log(`server running on ${PORT}`);
});
