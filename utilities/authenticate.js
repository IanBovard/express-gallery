function isAuthenticated (req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/main/login');
}

module.exports = { isAuthenticated: isAuthenticated };