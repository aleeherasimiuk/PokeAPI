const teamsDatabase = {};

const bootstrapTeam = (userId) => {
  teamsDatabase[userId] = [];
};

const addPokemon = (userId, pokemonName) => {
  teamsDatabase[userId].push({
    name: pokemonName,
  });
};

const setTeam = (userId, team) => {
  teamsDatabase[userId] = team;
}

const getTeamOfUser = (userId) => {
  return teamsDatabase[userId];
}

// Export the functions
module.exports = {
  bootstrapTeam,
  addPokemon,
  setTeam,
  getTeamOfUser,
};

/*

exports.bootstrapTeam = bootstrapTeam;
exports.setTeam = setTeam;
exports.addPokemon = addPokemon;
*/