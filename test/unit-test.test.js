const assert = require('chai').assert;

function add(number, otherNumber){
  return number + otherNumber;
}

describe('Suite de prueba', () => {
  it('should return 2', () => {
      let value = add(1, 1);
      assert.equal(value, 2);
  });
});