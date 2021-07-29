const express = require('express');
const passport = require('passport');
const app = express();
const port = 3001;

require('./auth')(passport);
app.use(express.json())

const authRoutes = require('./routers/auth').router;
app.use('/auth', authRoutes)

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