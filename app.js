const express = require('express');
require('./database');

const app = express();
const port = 24457;

const middlewares = require('./middlewares');
middlewares.setupMiddlewares(app);

const authRoutes = require('./auth/auth.router.js').router;
app.use('/auth', authRoutes)

const teamRoutes = require('./teams/teams.router.js').router;
app.use('/team', teamRoutes)


app.get('/', (request, response) => {
  response.status(200).send('Hello World!');
})

app.listen(port, () => {
  console.log('Listening on port ' + port);
})

exports.app = app;