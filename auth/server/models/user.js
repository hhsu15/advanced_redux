const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

//Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowecase: true },
  password: String,
});

//On Save Hook, encrypt password
// before saving the model, run this function
// now this is importtant, in order to have access to "this", you need to use "function" keyword. It cannot be an arrow function
userSchema.pre("save", function (next) {
  // get access to the user model
  const user = this;

  // generate a salt then run callback
  // generate a salt (which is a random strimg) can take come amount of time, so we run a call back after it's generated/failed
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    // hash (encrypt) our password along with the salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      // overwrite plain text password with encrypted password
      user.password = hash;

      // call next function to go ahead and save the model
      next();
    });
  });
});

// assign a method to userSchema
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

// create the model class
const ModelClass = mongoose.model("user", userSchema);

// export the model
module.exports = ModelClass;
