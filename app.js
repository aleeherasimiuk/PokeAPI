const express = require('express');
const app = express();
const port = 3000;

app.post("/team/pokemons", () => {})
app.get("/team", () => {})
app.delete("/team/pokemons/:pokeid", () => {})
app.put("/team", () => {})

app.get('/', (request, response) => {
  response.status(200).send('Hello World!');
})

app.listen(port, () => {
  console.log('Listening on port ' + port);
})

exports.app = app;