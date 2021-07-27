const express = require('express');
const app = express();
const port = 3000;


app.get('/', (request, response) => {
  response.status(200).send('Hello World!');
})

app.listen(port, () => {
    console.log('Listening on port ' + port);
})

