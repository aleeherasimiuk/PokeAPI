const { response } = require('express');
const express = require('express');
const app = express();
const port = 3000;

app.post("/team/pokemons", (request, response) => {
  response.status(200).send("Hello World")
})
app.get("/team", (request, response) => {
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