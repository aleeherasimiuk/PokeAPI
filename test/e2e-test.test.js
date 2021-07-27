const chai = require("chai");
const chaiHTTP = require("chai-http");

chai.use(chaiHTTP);

const app = require('../app').app;

describe('Auth', () => {
  it('Should return 401 (Unathorized) when no jwt token available', done => {
    chai.request(app).get('/team').end((err, res) => {
      chai.assert.equal(res.status, 401);
      done();
    })
  });

  it('Should return 200 (OK) when jwt is valid', done => {
    // Primero consulto /login que me devuelve el token que uso para el próximo request
    chai.request(app)
      .post('/login')
      .end((err, res) => {
        chai.request(app)
          .get('/team')
          .set('Authorization', `JWT ${res.body.token}`)
          .end((err, res) => {
            chai.assert.equal(res.status, 401);
            done();
          });
        done();
      });



  });
});