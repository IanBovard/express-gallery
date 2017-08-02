function isAuthenticated (req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/gallery/login');
}

module.exports = { isAuthenticated: isAuthenticated };