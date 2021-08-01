const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

const app = require('../app').app;
const usersController = require('../users/users.controller.js');
const teamsController = require('../teams/teams.controller.js');

before((done) => {
  usersController.registerUser('alee', 'hackme')
  done()
})

afterEach(async () => {
  /*
    Hay dos formas de tratar con Promesas
    Con callbacks
    Con await (la función debe ser async) y sin el done()
  */
  //teamsController.clearTeams().then(() => done())
  await teamsController.clearTeams()
});

const login = (user, pass) => {
  return chai.request(app)
    .post('/auth/login')
    .set('Content-Type', 'application/json')
    .send({ user: user, password: pass })
}

const getTeam = (token) => {
  return chai.request(app)
    .get('/team')
    .set('Authorization', `JWT ${token}`)
};


const addPokemon = (token, pokemonName) => {
  return chai.request(app)
    .post('/team/pokemons')
    .set('Authorization', `JWT ${token}`)
    .send({ name: pokemonName })
}

const putPokemons = (token, team) => {
  return chai.request(app)
    .put('/team')
    .set('Authorization', `JWT ${token}`)
    .send({ team: team })
}

describe('Teams Test', () => {
  it("Should return the user's team", done => {
    let team = [{ name: 'Charizard' }, { name: 'Blastoise' }]

    // Primero consulto /login que me devuelve el token que uso para el próximo request
    login('alee', 'hackme').end((err, res) => {
      let token = res.body.token;
      putPokemons(token, team)
        .end((err, res) => {
          getTeam(token)
            .end((err, res) => {
              chai.assert.equal(res.status, 200);
              chai.assert.equal(res.body.trainer, 'alee');
              chai.assert.equal(res.body.team.length, 2);
              chai.assert.equal(res.body.team[0].name, team[0].name);
              chai.assert.equal(res.body.team[1].name, team[1].name);
              done();
            });
        })
    });
  });


  it("Should return the pokedex number", done => {
    let pokemonName = 'Bulbasaur';

    login('alee', 'hackme')
      .end((err, res) => {
        let token = res.body.token;
        addPokemon(token, pokemonName)
          .end((err, res) => {
            chai.assert.equal(res.status, 201);
            getTeam(token)
              .end((err, resp) => {
                chai.assert.equal(resp.status, 200);
                chai.assert.equal(resp.body.trainer, 'alee');
                chai.assert.equal(resp.body.team.length, 1);
                chai.assert.equal(resp.body.team[0].name, pokemonName);
                chai.assert.equal(resp.body.team[0].pokedexNumber, 1);
                done();
              });
          })
      });
  });


  it("Should delete a pokemon", done => {

    let team = [{name: 'Charizard'}, {name: 'Pikachu'}, {name: 'Squirtle'}]

    const deletePokemon = (token, index) => {
      return chai.request(app)
        .delete('/team/pokemons/' + index)
        .set('Authorization', `JWT ${token}`)
    }

    login('alee', 'hackme')
      .end((err, res) => {
        let token = res.body.token;
        putPokemons(token, team).end((_, res) => {
            chai.assert.equal(res.status, 200);
            deletePokemon(token, 0).end((err, res) => {
              chai.assert.equal(res.status, 200);
              getTeam(token)
                .end((err, resp) => {
                  chai.assert.equal(resp.status, 200);
                  chai.assert.equal(resp.body.trainer, 'alee');
                  chai.assert.equal(resp.body.team.length, team.length - 1);
                  chai.assert.equal(resp.body.team[0].name, team[1].name);
                  done();
                });
            })
          })
      });
  });

  it("Should not be able to add pokemon if you aready have 6", (done) => {
    let team = [{ name: 'Charizard' }, { name: 'Pikachu' }, { name: 'Squirtle' }, { name: 'Bulbasaur' }, { name: 'Charmander' }, { name: 'Squirtle' }]

    login('alee', 'hackme')
      .end((err, res) => {
        let token = res.body.token;
        putPokemons(token, team).end((_, res) => {
          chai.assert.equal(res.status, 200);
          addPokemon(token, 'Mewtwo').end((err, res) => {
            chai.assert.equal(res.status, 400);
            done();
          });
        });
      });
  })
});