/**
 * Author: Arkady Zelensky
 */

const bCrypt = require('bcrypt');

const generateHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8));
};

const isValidPassword = function(userpass, enteredPassword) {
  return bCrypt.compareSync(enteredPassword, userpass);
};

module.exports = {
  generateHash,
  isValidPassword
}