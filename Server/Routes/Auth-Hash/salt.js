// salt the password before you hash it.
//require bcrypt. 
var bcrypt = require('bcrypt');

// gensalt already return a promise.

function genSalt() {
  return bcrypt.genSalt(10)
}

module.exports={
  genSalt
}

