const authMiddleware = require('./util/auth-middleware.js');
const express = require('express');

const setupMiddlewares = (app) => {
  app.use(express.json());
  authMiddleware.init();
  app.use(authMiddleware.protectWithJwt);
}

exports.setupMiddlewares = setupMiddlewares;