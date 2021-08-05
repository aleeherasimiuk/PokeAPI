const usersController = require('../users/users.controller.js');
const jwt = require('jsonwebtoken');
const { to } = require('../util/to.js');

const login = async (request, response) => {

  let validations = [
    (request) => Object.keys(request.body).length == 0,
    (request) => !request.body.user,
    (request) => !request.body.password
  ]

  let missingData = validations.some((validation) => validation(request));

  if(missingData)
    return response.status(400).json({message: 'Missing data'});

  let [error, resp] = 
    await to(usersController.checkUserCredentials(request.body.user, request.body.password));


  if(error || !resp)
    return response.status(401).json({message: 'Invalid credentials'});


  let user = await usersController.getUserIdFromUsername(request.body.user);

  if(!user)
    return response.status(500).json({message: 'User not Found'});

  let token = jwt.sign({userId: user}, 'secretPassword');
  return response.status(200).json({token: token});


}

const redirectToLogin = (request, response) => response.redirect('/login')

exports.login = login;
exports.redirectToLogin = redirectToLogin;