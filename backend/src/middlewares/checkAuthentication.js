function checkAuthentication(req,res,next) {
  console.log("checkAuthentication", req.isAuthenticated())
  if(req.isAuthenticated()){
      next();
  } else{
    next();
      /* console.log("res.status(401)");
      res.status(401); */
  }
}

module.exports = checkAuthentication;