const assert = require('chai').assert;
const usersController = require('../users/users.controller.js')
const teamController = require('../teams/teams.controller.js')


describe('Suite de prueba', () => {

  beforeEach(async () => {
    await usersController.registerUser('user', 'hackme')
  })
  
  afterEach(async () => {
    await teamController.clearTeams();
    await usersController.cleanDatabase();
  });

  it('user', async() => {
      let user = await usersController.getUserFromUsername('user')
      assert.equal('user', user.username);
  });
  
  it('User has team', async () => {
    let id = await usersController.getUserIdFromUsername('user');
    let team = await teamController.getTeamOfUser(id);

    assert.isEmpty(team)
  });

  it('User has team with bulbasaur', async () => {
    let id = await usersController.getUserIdFromUsername('user');
    await teamController.addPokemon(id, {name: 'Bulbasaur', pokedexNumber: 1});
    let team = await teamController.getTeamOfUser(id);
    assert.isNotEmpty(team)
  });
});