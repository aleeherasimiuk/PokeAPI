const bcrypt = require('bcrypt');

const hashPassword = (plainTextPassword, done) => {
  bcrypt.hash(plainTextPassword, 10, done);
};

const comparePassword = (plainTextPassword, hashedPassword, done) => {
  bcrypt.compare(plainTextPassword, hashedPassword, done);
};