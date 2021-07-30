const usersController = require('../users/users.controller.js');
const jwt = require('jsonwebtoken');

const login = (request, response) => {

  let validations = [
    (request) => Object.keys(request.body).length == 0,
    (request) => !request.body.user,
    (request) => !request.body.password
  ]

  let missingData = validations.some((validation) => validation(request));

  if(missingData)
    return response.status(400).json({message: 'Missing data'});

  // if (!request.body) {
  //   return response.status(400).json({ messaje: "Missing Data" })
  // }

  // if (!request.body.user || !request.body.password) {
  //   return response.status(400).json({ messaje: "Missing Data" })
  // }




  // Comprobamos credenciales
  usersController.checkUserCredentials(request.body.user, request.body.password, (err, result) => {
    // Si no son válidas, error
    if (err || !result) {
      return response.status(401).json({ message: 'Invalid credentials' })
    }
    // Si son válidas, generamos un JWT
    let user = usersController.getUserIdFromUsername(request.body.user);
    const token = jwt.sign({ userId: user}, 'secretPassword');
    response.status(200).json({ token: token });
  });

}

const redirectToLogin = (request, response) => response.redirect('/login')

exports.login = login;
exports.redirectToLogin = redirectToLogin;