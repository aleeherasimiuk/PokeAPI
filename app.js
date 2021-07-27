const express = require('express');
const passport = require('passport');
const usersController = require('./controllers/users.js');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
require('./auth')(passport);

app.post('/login', (request, response) => {

  // Comprobamos credenciales
  usersController.checkUserCredentials(request.body.user, request.body.password, (err, result) => {
    // Si no son válidas, error
    if (!result) {
      return response.status(401).json(
        {
          message: 'Invalid credentials'
        }
      )
    }
  });

  // Si son válidas, generamos un JWT
  const token = jwt.sign({ userId: request.body.user, });
  response.status(200).json({ token: token })
});

app.post("/team/pokemons", (request, response) => {
  response.status(200).send("Hello World")
})
app.get("/team",                                      // Endpoint
  passport.authenticate('jwt', { session: false }),  // MiddleWare (0..n). next()
  (request, response) => {                          // Handler        
    response.status(200).send("Hello World")
  })
app.delete("/team/pokemons/:pokeid", (request, response) => {
  response.status(200).send("Hello World")
})
app.put("/team", (request, response) => {
  response.status(200).send("Hello World")
})

app.get('/', (request, response) => {
  response.status(200).send('Hello World!');
})

app.listen(port, () => {
  console.log('Listening on port ' + port);
})

exports.app = app;