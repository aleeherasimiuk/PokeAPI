const express = require('express');
const router = express.Router();

const passport = require('passport');
require('../auth')(passport);

const teamsController = require('../controllers/teams');
const usersController = require('../controllers/users');

router.route('/').get(
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    let user = usersController.getUser(request.user.userId);
    response.status(200).json({
      trainer: user.username,
      team: teamsController.getTeamOfUser(request.user.userId)
    })
  }).put(passport.authenticate('jwt', { session: false }), (request, response) => {
    teamsController.setTeam(request.user.userId, request.body.team);
    response.sendStatus(200);
  })

router.route('pokemons').post((request, response) => {
  response.status(200).send("Hello World")
})

router.route('/pokemons/:pokeid').delete((request, response) => {
  response.status(200).send("Hello World")
})

exports.router = router;