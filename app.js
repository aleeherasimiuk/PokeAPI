const express = require('express');
const passport = require('passport');
const usersController = require('./controllers/users.js');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;
require('./auth')(passport);
app.use(express.json())

app.post('/login', (request, response) => {

  if(!request.body){
    return response.status(400).json({messaje: "Missing Data"})
  }

  if(!request.body.user || !request.body.password){
    return response.status(400).json({messaje: "Missing Data"})
  }

  // Comprobamos credenciales
  usersController.checkUserCredentials(request.body.user, request.body.password, (err, result) => {
    // Si no son válidas, error
    if (err || !result) {
      return response.status(401).json({message: 'Invalid credentials'})
    }

    const token = jwt.sign({userId: result}, 'secretPassword');
    response.status(200).json({token:token});
  });

  // Si son válidas, generamos un JWT
  
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