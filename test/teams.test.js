const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

const app = require('../app').app;
const usersController = require('../controllers/users.js');
const teamsController = require('../controllers/teams.js');

describe('Teams Test', () => {
  it("Should return the user's team", done => {
    usersController.registerUser('alee', 'hackme')
    let team = [{ name: 'Charizard' }, { name: 'Blastoise' }]
    // Primero consulto /login que me devuelve el token que uso para el próximo request
    chai.request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({ user: 'alee', password: 'hackme' })
      .end((err, res) => {
        let token = res.body.token;
        chai.request(app)
          .put('/team')
          .send({ team: team })
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            chai.request(app).get('/team')
              .set('Authorization', `JWT ${token}`)
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
    usersController.registerUser('alee2', 'hackme')
    chai.request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({ user: 'alee2', password: 'hackme' })
      .end((err, res) => {
        let token = res.body.token;
        chai.request(app)
          .post('/team/pokemons')
          .send({ name: pokemonName })
          .set('Authorization', `JWT ${token}`)
          .end((err, res) => {
            chai.assert.equal(res.status, 201);
            chai.request(app).get('/team')
              .set('Authorization', `JWT ${token}`)
              .end((err, resp) => {
                chai.assert.equal(resp.status, 200);
                chai.assert.equal(resp.body.trainer, 'alee2');
                chai.assert.equal(resp.body.team.length, 1);
                chai.assert.equal(resp.body.team[0].name, pokemonName);
                chai.assert.equal(resp.body.team[0].pokedexNumber, 1);
                done();
              });
          })
      });
  });
});