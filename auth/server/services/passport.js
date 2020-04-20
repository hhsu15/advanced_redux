const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

//------------- Strategy 1-------------
// Setup options for JWT strategy
const jwtOptions = {
  // extract the jwt from the header
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
};

//create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // the payload is going to be the one that we created with "sub" and "iat"
  // see if the user id in the payload exists in our db
  // if it does, call done with that user object
  // otherwise call done withoiut user object
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

//------------- Strategy 2-------------
// This is another strategy. For the time, the user will only provide email and password, no token is involved,
// therefore, this strategy is meant to authenticate user with the email and password
// this is referred as local strategy, since data is stored locally
const localOptions = { usernameField: "email" }; // telling the passport to use email when it tries to find the usernameField
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // verify this username and password, call done with the user
  // if it is the correct username and password
  // otherwise, call done with false
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    // compare password - is password equal user.password
    // we will encode the user provided pw with salt + hash - samething we did when saving them
    // and compared the encoded password in the db
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, user);
    });
  });
});

// tell passport to use this strategy
// this is where it connects to the jwt strategy
passport.use(jwtLogin);
passport.use(localLogin);
