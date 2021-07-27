const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = passport => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: 'secretPassword' // TODO: Env var
  };

  passport.use(new JwtStrategy(opts, (decoded, done) => {
    console.log(decoded);
    return done(null, decoded);
  }));
}