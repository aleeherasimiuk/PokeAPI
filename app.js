const express = require('express');

const app = express();
const port = 3001;

app.use(express.json())

const authRoutes = require('./routers/auth').router;
app.use('/auth', authRoutes)

const teamRoutes = require('./routers/teams').router;
app.use('/team', teamRoutes)


app.get('/', (request, response) => {
  response.status(200).send('Hello World!');
})

app.listen(port, () => {
  console.log('Listening on port ' + port);
})

exports.app = app;