const uuid = require('uuid')
const crypto = require('./crypto.js')

const userDatabase = {
  '0001': {
    'username': '',
    'password': '',
    'salt': ''
  }
};

const checkUserCredentials = (userId, password) => {
  let user = userDatabase[userId];
  return crypto.comparePassword(password, user.password, (err, result) => {
    return result;
  })
}

const registerUser = (username,password) => {
  crypto.hashPassword(password, (err, result) => {
    userDatabase[uuid.v4()] = {
      'username': username,
      'password': result
    }
  })
  
  
}