const uuid = require('uuid');
const crypto = require('../util/crypto.js');
const teams = require('../teams/teams.controller.js');

let userDatabase = {};

const checkUserCredentials = (username, password) => {
  return new Promise(async (resolve, reject) => {
    let user = await getUserFromUsername(username);
    if(user){
      return crypto.comparePassword(password, user.password, 
          (err, result)=> err? reject(err): resolve(result))
    } else 
      return reject("User not found");
  });
}

const registerUser = (username, password) => {
  return new Promise(async (resolve, _) => {
    let hashed = crypto.hashPasswordSync(password);

    let userId = uuid.v4();

    userDatabase[userId] = {
      username: username,
      password: hashed,
    }

    await teams.bootstrapTeam(userId);

    resolve(userId);
  });
}

const getUserIdFromUsername = (username) => {
  return new Promise((resolve, reject) => {
    for(let user in userDatabase){
      if(userDatabase[user].username === username){
        return resolve(user)
      }
    }
    reject("User not found");
  });
}

const getUserFromUsername = (username) => {
  return new Promise((resolve, reject) => {
    for(let user in userDatabase){
      if(userDatabase[user].username === username){
        return resolve(userDatabase[user]);
      }
    }
    reject("User not found");
  });
}

const getUser = (userId) => {
  return new Promise(resolve => {
    return resolve(userDatabase[userId]);
  });
}

const cleanDatabase = () => {
  return new Promise(resolve => {
    userDatabase = {};
    resolve();
  });
};

exports.registerUser = registerUser
exports.checkUserCredentials = checkUserCredentials
exports.getUserIdFromUsername = getUserIdFromUsername
exports.getUser = getUser
exports.getUserFromUsername = getUserFromUsername
exports.cleanDatabase = cleanDatabase