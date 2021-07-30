const assert = require('chai').assert;
const userController = require('../users/users.controller.js')
const teamController = require('../teams/teams.controller.js')


describe('Suite de prueba', () => {
  it('admin', () => {

      userController.registerUser('admin', 'hackme');
      let admin = userController.getUserFromUsername('admin')
      assert.equal('admin', admin.username);
  });
  
  it('User has team', () => {
    userController.registerUser('user', 'hackme');
    let id = userController.getUserIdFromUsername('user');
    let team = teamController.getTeamOfUser(id);

    assert.isEmpty(team)
  });

  it('User has team with bulbasaur', () => {
    userController.registerUser('user', 'hackme');
    let id = userController.getUserIdFromUsername('user');
    let team = teamController.getTeamOfUser(id);
    teamController.addPokemon(id, {name: 'Bulbasaur', pokedexNumber: 1});
    assert.isNotEmpty(team)
  });
});