const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const init = () => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: 'secretPassword' // TODO: Env var
  };

  passport.use(new JwtStrategy(opts, (decoded, done) => {
    return done(null, decoded);
  }));
}

const protectWithJwt = (req, res, next) => {
  // Para estas rutas no es necesario estar autenticado
  let paths = ['/', '/auth/login']
  if(paths.includes(req.path)){
    return next();
  }

  return passport.authenticate('jwt', { session: false })(req, res, next);
}

// Exports
module.exports = {
  init,
  protectWithJwt
}