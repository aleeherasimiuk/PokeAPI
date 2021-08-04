const teamsDatabase = {};

const bootstrapTeam = (userId) => {
  return new Promise((resolve, reject) => {
    teamsDatabase[userId] = []
    resolve()
  })
};

const addPokemon = (userId, pokemon) => {
  return new Promise((resolve, reject) => {
    if(teamsDatabase[userId].length >= 6) {
      reject("Already have 6 pokemon");
    }
    teamsDatabase[userId].push(pokemon);
    resolve();
  });
};

const setTeam = (userId, team) => {
  return new Promise((resolve, reject) => {
    teamsDatabase[userId] = team;
    resolve()
  });
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
  return new Promise((resolve, reject) => {
    teamsDatabase[userId].splice(index, 1);
    resolve();
  });
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