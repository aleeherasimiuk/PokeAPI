const uuid = require('uuid');
const crypto = require('../util/crypto.js');
const teams = require('../teams/teams.controller.js');

let userDatabase = {};

const checkUserCredentials = (username, password, done) => {
  let user = getUserFromUsername(username);

  if(!user){
    done("Missing user")
  }

  crypto.comparePassword(password, user.password, done)
}

const registerUser = (username, password) => {
  let hashed = crypto.hashPasswordSync(password);

  let userId = uuid.v4();

  userDatabase[userId] = {
    'username': username,
    'password': hashed,
  }

  teams.bootstrapTeam(userId);

  return userId;
}

const getUserIdFromUsername = (username) => {
  for(let user in userDatabase){
    if(userDatabase[user].username === username){
      return user
    }
  }
}

const getUserFromUsername = (username) => {
  for(let user in userDatabase){
    if(userDatabase[user].username === username){
      return userDatabase[user]
    }
  }
}

const getUser = (userId) => {
  return userDatabase[userId];
}

const cleanDatabase = () => {
  userDatabase = {};
};

exports.registerUser = registerUser
exports.checkUserCredentials = checkUserCredentials
exports.getUserIdFromUsername = getUserIdFromUsername
exports.getUser = getUser
exports.getUserFromUsername = getUserFromUsername
exports.cleanDatabase = cleanDatabase