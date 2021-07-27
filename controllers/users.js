const uuid = require('uuid')
const crypto = require('../crypto.js')

const userDatabase = {};

const checkUserCredentials = (username, password, done) => {
  let user = getUserFromUsername(username);

  if(!user){
    done("Missing user")
  }

  crypto.comparePassword(password, user.password, done)
}

const registerUser = (username, password) => {
  let hashed = crypto.hashPasswordSync(password);

  userDatabase[uuid.v4()] = {
    'username': username,
    'password': hashed,
  }
}

const getUserFromUsername = (username) => {
  for(let user in userDatabase){
    if(userDatabase[user].username === username){
      return userDatabase[user]
    }
  }
}

exports.registerUser = registerUser
exports.checkUserCredentials = checkUserCredentials
exports.getUserFromUsername = getUserFromUsername