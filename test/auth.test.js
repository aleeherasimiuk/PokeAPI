const chai = require("chai");
const chaiHTTP = require("chai-http");

chai.use(chaiHTTP);

const app = require('../app').app;
const usersController = require('../users/users.controller.js');

before((done) => {
  usersController.registerUser('alee', 'hackme')
  done()
})

after((done) => {
  usersController.cleanDatabase();
  done()
});

describe('Auth', () => {

  it('Should return 401 (Unathorized) when no jwt token available', done => {
    chai.request(app).get('/team').end((err, res) => {
      chai.assert.equal(res.status, 401);
      done();
    })
  });

  it('Should return 400 when no data is provided', (done) => {
    chai.request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .end((err, result) => {
        chai.assert.equal(result.status, 400);
        done();
      })
  });

  it('Should return 400 when no user is provided', (done) => {
    chai.request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        password: 'hackme'
      })
      .end((err, result) => {
        chai.assert.equal(result.status, 400);
        done();
      })
  });

  it('Should return 400 when no password is provided', (done) => {
    chai.request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        user: 'alee'
      })
      .end((err, result) => {
        chai.assert.equal(result.status, 400);
        done();
      })
  });

  it('Should return 200 (OK) and token for successful login', (done) => {

    chai.request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        user: 'alee',
        password: 'hackme'
      })
      .end((err, result) => {
        chai.assert.equal(result.status, 200);
        chai.assert.isDefined(result.body.token);
        done();
      })
  });

  it('Should return 200 (OK) when jwt is valid', done => {
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
            chai.assert.equal(res.status, 200);
            done();
          });
      });

  });
});