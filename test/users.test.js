const assert = require('chai').assert;
const userController = require('../users/users.controller.js')
const teamController = require('../teams/teams.controller.js')


describe('Suite de prueba', () => {
  it('admin', async() => {

      await userController.registerUser('admin', 'hackme');
      let admin = await userController.getUserFromUsername('admin')
      assert.equal('admin', admin.username);
  });
  
  it('User has team', async () => {
    await userController.registerUser('user', 'hackme');
    let id = await userController.getUserIdFromUsername('user');
    let team = await teamController.getTeamOfUser(id);

    assert.isEmpty(team)
  });

  it('User has team with bulbasaur', async () => {
    await userController.registerUser('user', 'hackme');
    let id = await userController.getUserIdFromUsername('user');
    let team = await teamController.getTeamOfUser(id);
    await teamController.addPokemon(id, {name: 'Bulbasaur', pokedexNumber: 1});
    assert.isNotEmpty(team)
  });
});