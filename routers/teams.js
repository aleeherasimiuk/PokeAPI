const express = require('express');
const router = express.Router();

const passport = require('passport');
require('../auth')(passport);


router.route('/').get(
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    response.status(200).send("Hello World")
  }).put((request, response) => {
    response.status(200).send("Hello World")
  })

router.route('pokemons').post((request, response) => {
  response.status(200).send("Hello World")
})

router.route('/pokemons/:pokeid').delete((request, response) => {
  response.status(200).send("Hello World")
})

exports.router = router;