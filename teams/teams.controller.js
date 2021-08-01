const teamsDatabase = {};

const bootstrapTeam = (userId) => {
  teamsDatabase[userId] = [];
};

const addPokemon = (userId, pokemon) => {
  return new Promise((resolve, reject) => {
    if(teamsDatabase[userId].length >= 6) {
      reject();
    }
    teamsDatabase[userId].push(pokemon);
    resolve();
  });
};

const setTeam = (userId, team) => {
  teamsDatabase[userId] = team;
}

const getTeamOfUser = (userId) => {
  return new Promise((resolve, reject) => {
    resolve(teamsDatabase[userId]);
  });
}

const clearTeams = () => {
  return new Promise((resolve, reject) => {
    for (let userId in teamsDatabase) {
      teamsDatabase[userId] = [];
    }
    resolve();
  })
  
}

const removePokemon = (userId, index) => {
  teamsDatabase[userId].splice(index, 1);
}
// Export the functions
module.exports = {
  bootstrapTeam,
  addPokemon,
  setTeam,
  getTeamOfUser,
  clearTeams,
  removePokemon
};

/*

exports.bootstrapTeam = bootstrapTeam;
exports.setTeam = setTeam;
exports.addPokemon = addPokemon;
*/