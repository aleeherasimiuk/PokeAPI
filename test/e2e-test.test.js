const chai = require("chai");
const chaiHTTP = require("chai-http");

chai.use(chaiHTTP);

const app = require('../app').app;

describe('Suite de prueba e2e para el curso',() => {
  it('should return hello world', done => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        chai.assert(res.text, 'Hello World!')
        done();
      });
  })
});