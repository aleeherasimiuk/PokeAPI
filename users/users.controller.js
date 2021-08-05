const uuid = require('uuid');
const crypto = require('../util/crypto.js');
const teams = require('../teams/teams.controller.js');
const mongoose = require('mongoose');
const { to } = require('../util/to.js');

const UserModel = mongoose.model('UserModel', {
  username: String,
  password: String,
  userId: String,
})

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

    let newUser = new UserModel({
      username: username,
      password: hashed,
      userId: userId,
    })

    await newUser.save()
    await teams.bootstrapTeam(userId);

    resolve(userId);
  });
}

const getUserIdFromUsername = (username) => {
  return new Promise(async resolve => {
    let [error, result] = await to(getUserFromUsername(username));
    return error? reject(error): resolve(result.userId);
  });
}

const getUserFromUsername = (username) => {
  return new Promise(async resolve => {
    let [error, result] = await to(UserModel.findOne({username: username}).exec());
    return error? reject(error): resolve(result);
  });
}

const getUser = (userId) => {
  return new Promise(async resolve => {
    let [error, result] = await to(UserModel.findOne({userId: userId}).exec());
    return error? reject(error): resolve(result);
  });
}

const cleanDatabase = () => {
  return new Promise(async resolve => {
    await UserModel.deleteMany({}).exec()
    resolve();
  });
};

exports.registerUser = registerUser
exports.checkUserCredentials = checkUserCredentials
exports.getUserIdFromUsername = getUserIdFromUsername
exports.getUser = getUser
exports.getUserFromUsername = getUserFromUsername
exports.cleanDatabase = cleanDatabase