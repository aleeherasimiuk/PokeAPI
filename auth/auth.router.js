const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const usersController = require('../users/users.controller.js');

router.route('/').get((request, response) => {
  response.send('GET Auth router')
}).post((request, response) => {
  response.send('POST Auth router')
});

router.route('/login').post((request, response) => {

  if (!request.body) {
    return response.status(400).json({ messaje: "Missing Data" })
  }

  if (!request.body.user || !request.body.password) {
    return response.status(400).json({ messaje: "Missing Data" })
  }

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

});

exports.router = router;