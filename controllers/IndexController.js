/**
 * Author: Arkady Zelensky
 */

const AuthController = require('./AuthController');

exports.getIndex = (req, res, next) => {

  const data = {
    title: 'Main ',
    isSigned: AuthController.isUserSigned(req),
  };
  
  res.render('index', data);
}
