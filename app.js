const express = require('express');
const passport = require('passport');
const app = express();
const port = 3000;
require('./auth')(passport);

app.post('/login', (request, response)=>{

  // Comprobamos credenciales
  // Si no son válidas, error
  // Si son válidas, generamos un JWT

  response.status(200).json(
    {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o'
    }
  )
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