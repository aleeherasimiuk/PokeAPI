const axios = require('axios').default;

const teamsController = require('./teams.controller.js');
const usersController = require('../users/users.controller.js');

const getTeamFromUser = async (request, response) => {
  let userID = request.user.userId;
  let user = usersController.getUser(userID);
  let team = await teamsController.getTeamOfUser(userID);
  response.status(200).json({
    trainer: user.username,
    team: team
  })
}

const setTeamToUser = (request, response) => {
  teamsController.setTeam(request.user.userId, request.body.team);
  response.sendStatus(200);
}

const addPokemon = async (request, response) => {
  let pokemonName = request.body.name;
  let pokeApiResponse = 
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
  let id = pokeApiResponse.data.id;
  let pokemon = {
    name: pokemonName,
    pokedexNumber: id
  }
  try {
    await teamsController.addPokemon(request.user.userId, pokemon);
    response.sendStatus(201).json(pokemon);
  } catch (error) {
    response.status(400).json({ message: "You have already 6 pokemon" });
  }

}

const deletePokemon = (request, response) => {
  teamsController.removePokemon(request.user.userId, parseInt(request.params.pokeid));
  response.sendStatus(200);
}

// Exports all functions
module.exports = {
  getTeamFromUser,
  setTeamToUser,
  addPokemon,
  deletePokemon
}
