const jwt = require("jwt-simple");
const User = require("../models/user");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  // sub stands for "subject", it's a special property for jwt
  // iat stands for "issue at time" which is another property for jwt
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
  // user has already had their email and password auth'd
  // we just need to give them a token

  // you can access the user by using req.user
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
  //   res.send({ success: "true" });
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "you must provide email and password" });
  }
  // see if a user with the given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      console.log("err:", err);
      return next(err);
    }
    // if email does exist, return 422 error (unprocessible)
    if (existingUser) {
      console.log("find exisitng");
      return res.status(422).send({ error: "Email is in use" });
    }

    // if email does not exist, create and save user record
    const user = new User({ email, password }); // create a new user
    user.save((err) => {
      console.log("saving..");
      if (err) {
        return next(err);
      }
      // respond to request indicating the user was created
      console.log("password:", user.password);

      // provide the encoded token to user
      res.json({ token: tokenForUser(user) });
    });
  });
};
