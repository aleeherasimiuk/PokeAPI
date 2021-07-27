const uuid = require('uuid')
const crypto = require('../crypto.js')

const userDatabase = {
};

const checkUserCredentials = (userId, password) => {
  let user = userDatabase[userId];
  return crypto.comparePassword(password, user.password, (err, result) => {
    return result;
  })
}

const registerUser = (username, password) => {
  let hashed = crypto.hashPassword(password);

  userDatabase[uuid.v4()] = {
    'username': username,
    'password': hashed,
  }
}

exports.registerUser = registerUser