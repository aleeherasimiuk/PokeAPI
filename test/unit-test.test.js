const assert = require('chai').assert;
const userController = require('../controllers/users.js')


describe('Suite de prueba', () => {
  it('admin', () => {

      userController.registerUser('admin', 'hackme');
      let admin = userController.getUserFromUsername('admin')
      assert.equal('admin', admin.username);
  });
});