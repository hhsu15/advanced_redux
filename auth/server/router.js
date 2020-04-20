const Authentication = require("./controllers/authentication");

const passport = require("passport");

// this connects the strategy with the jwt even though we are not using the variable. It does it thru side effect
const passportService = require("./services/passport");

// this is how you do export in node
// module.exports = (app) => {
//   // add endpoint to app
//   app.get("/", (req, res, next) => {
//     res.send(["dog", "cat", "tiger"]);
//   });
// };

// Middlewares
const requireAuth = passport.authenticate("jwt", { session: false }); // use this to authenticate the token
const requireSignin = passport.authenticate("local", { session: false }); // use this to authenticate and email and password

module.exports = (app) => {
  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/signup", Authentication.signup);
  app.get("/", requireAuth, (req, res) => {
    res.send({ hi: "there" });
  });
};
