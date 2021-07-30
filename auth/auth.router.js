const express = require('express');
const router = express.Router();

const {login, redirectToLogin} = require('./auth.http.js');

router.route('/').get(redirectToLogin);

router.route('/login').post(login);

exports.router = router;