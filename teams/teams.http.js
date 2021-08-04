const axios = require('axios').default;

const teamsController = require('./teams.controller.js');
const usersController = require('../users/users.controller.js');
const { to } = require('../util/to');

const getTeamFromUser = async (request, response) => {
  let userID = request.user.userId;
  let user = await usersController.getUser(userID);
  let team = await teamsController.getTeamOfUser(userID);
  response.status(200).json({
    trainer: user.username,
    team: team
  })
}

const setTeamToUser = async (request, response) => {
  await teamsController.setTeam(request.user.userId, request.body.team);
  response.sendStatus(200);
}

const addPokemon = async (request, response) => {
  let pokemonName = request.body.name;
  let [error, pokeApiResponse] =
    await to(axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`));
  
  if(error){
    return response.status(400).json({message: 'Pokemon not found'});
  }
  
  let id = pokeApiResponse.data.id;
  let pokemon = {
    name: pokemonName,
    pokedexNumber: id
  }
  
  let [errorAdd, _] = await to(teamsController.addPokemon(request.user.userId, pokemon));
  
  if(errorAdd)
    return response.status(400).json({ message: "You have already 6 pokemon" });
  
  response.sendStatus(201).json(pokemon);
  

}


const deletePokemon = async (request, response) => {
  await teamsController.removePokemon(request.user.userId, parseInt(request.params.pokeid));
  response.sendStatus(200);
}

// Exports all functions
module.exports = {
  getTeamFromUser,
  setTeamToUser,
  addPokemon,
  deletePokemon
}
