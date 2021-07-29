const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

const app = require('../app').app;
const usersController = require('../controllers/users.js');
const teamsController = require('../controllers/teams.js');

describe('Teams Test', () => {
  it("Should return the user's team", done => {
    let userId = usersController.registerUser('alee', 'hackme')
    
    teamsController.setTeam(userId, ['Charizard', 'Blastoise'])
    // Primero consulto /login que me devuelve el token que uso para el próximo request
    chai.request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        user: 'alee',
        password: 'hackme'
      })
      .end((err, res) => {
        chai.request(app)
          .get('/team')
          .set('Authorization', `JWT ${res.body.token}`)
          .end((err, res) => {
            // Tiene equipo con Charizard y Blastoise
            // {trainer: 'alee', team: ['Charizard', 'Blastoise']}
            
            chai.assert.equal(res.status, 200);
            chai.assert.equal(res.body.trainer, 'alee');
            chai.assert.equal(res.body.team.length, 2);
            chai.assert.equal(res.body.team[0], 'Charizard');
            chai.assert.equal(res.body.team[1], 'Blastoise');
            done();
          });
      });
  });
});