const express = require('express');
const router = express.Router();

const { getTeamFromUser, setTeamToUser, addPokemon, deletePokemon } = require('./teams.http');

router.route('/')
  .get(getTeamFromUser)
  .put(setTeamToUser)

router.route('/pokemons').post(addPokemon)

router.route('/pokemons/:pokeid').delete(deletePokemon)

exports.router = router;