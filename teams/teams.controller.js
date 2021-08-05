const mongoose = require('mongoose');
const {to} = require('../util/to');


const TeamModel = mongoose.model('TeamModel', {
  userId: String,
  team: [] 
});


const bootstrapTeam = (userId) => {
  return new Promise(async (resolve, reject) => {
    let newTeam = new TeamModel({
      userId: userId,
      team: []
    });
    await newTeam.save()
    resolve()
  })
};

const addPokemon = (userId, pokemon) => {
  return new Promise(async (resolve, reject) => {

    let [err, dbTeam] = await to(TeamModel.findOne({userId: userId}).exec());
    if (err) {
      reject(err);
    }

    if(dbTeam.team.length >= 6) {
      reject("Already have 6 pokemon");
    }
    dbTeam.team.push(pokemon);
    await dbTeam.save();
    resolve();
  });
};

const setTeam = (userId, newTeam) => {
  return new Promise(async (resolve, reject) => {
    let [err, dbTeam] = await to(TeamModel.findOne({userId: userId}).exec());
    if (err) {
      reject(err);
    }
    dbTeam.team = newTeam;
    await dbTeam.save();
    resolve()
  });
}

const getTeamOfUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let [err, dbTeam] = await to(TeamModel.findOne({userId: userId}).exec());
    return err? reject(err): resolve(dbTeam.team || []);
  });
}

const clearTeams = () => {
  return new Promise(async (resolve, reject) => {
    await TeamModel.deleteMany({})
    resolve()
  })
  
}

const removePokemon = (userId, index) => {
  return new Promise(async (resolve, reject) => {

    let [err, dbTeam] = await to(TeamModel.findOne({userId: userId}).exec());
    if (err) 
      reject(err);
    
    if(!dbTeam.team[index])
      reject("No such pokemon");

    dbTeam.team.splice(index, 1);
    await dbTeam.save();
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