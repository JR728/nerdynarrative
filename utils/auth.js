const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect them to the login page
    if (!req.session.loggedIn) {
      res.redirect('/signup');
    } else {
      // If the user is logged in, allow them to proceed to the next middleware
      next();
    }
  };
  
module.exports = withAuth;
  