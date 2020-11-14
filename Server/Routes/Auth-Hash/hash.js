// hash the password after you salt it!
//require bcrypt.
var bcrypt = require('bcrypt');

// bcrypt hash is already promisified.
// first params the password the second the salt

function genHash(salt, password) {
    // password is the password that we took it from the body.
    // salt is the function salt in salt.js.
    // before ou hash you need to await the salt function!!!
    // the function needs to be async!!
    return bcrypt.hash(password, salt)
}
  

