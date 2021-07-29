const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

const app = require('../app').app;
const usersController = require('../controllers/users.js');
const teamsController = require('../controllers/teams.js');

before((done) => {
  usersController.registerUser('alee', 'hackme')
  done()
})

afterEach((done) => {
  teamsController.clearTeams()
  done()
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

describe('Teams Test', () => {
  it("Should return the user's team", done => {
    let team = [{ name: 'Charizard' }, { name: 'Blastoise' }]

    const putPokemon = (token) => {
      return chai.request(app)
        .put('/team')
        .set('Authorization', `JWT ${token}`)
        .send({ team: team })
    }
    // Primero consulto /login que me devuelve el token que uso para el próximo request
    login('alee', 'hackme').end((err, res) => {
      let token = res.body.token;
      putPokemon(token)
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

    const deletePokemon = (token, index) => {
      return chai.request(app)
        .delete('/team/pokemons/' + index)
        .set('Authorization', `JWT ${token}`)
    }

    login('alee', 'hackme')
      .end((err, res) => {
        let token = res.body.token;
        addPokemon(token, 'Bulbasaur').end((_, res) => {
          chai.assert.equal(res.status, 201);
          addPokemon(token, 'Pikachu').end((_, res) => {
            chai.assert.equal(res.status, 201);
            deletePokemon(token, 0).end((err, res) => {
              chai.assert.equal(res.status, 200);
              getTeam(token)
                .end((err, resp) => {
                  chai.assert.equal(resp.status, 200);
                  chai.assert.equal(resp.body.trainer, 'alee');
                  chai.assert.equal(resp.body.team.length, 1);
                  chai.assert.equal(resp.body.team[0].name, 'Pikachu');
                  done();
                });
            })
          })
        });
      });
  });
});