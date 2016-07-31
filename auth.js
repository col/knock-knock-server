var passport = require('passport');
var SamlStrategy = require('passport-saml').Strategy;

passport.serializeUser(function(user, next) {
  console.log("*** user = " + JSON.stringify(user, null, 4));
  //TODO: limit to people from singapore office only
  next(null, user.nameID);
});

passport.deserializeUser(function(id, next) {
	if (!id) {
		return next(new Error("User is not authenticated"), null);
	}
	next(null, { nameID: id });
});

passport.use(new SamlStrategy(
  {
    issuer: process.env.OKTA_ISSUER,
    entryPoint: process.env.OKTA_SSO,
    cert: process.env.OKTA_CERT
  },
  function(profile, next) {
    console.log("*** profile = " + JSON.stringify(profile, null, 4));
    if (!profile.nameID) {
      return next(new Error("No nameID found"), null);
    }
    process.nextTick(function () {
      return next(null, profile)
    });
  }
));

passport.protected = function protected(req, res, next) {
	console.log(req.user);
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports = passport;