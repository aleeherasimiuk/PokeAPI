const mongoose = require('mongoose');
const {user, password} = require('./credentials');

let db = 'production';

if(process.env.NODE_ENV === 'test'){
  db = 'test';
}

mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.5adsy.mongodb.net/${db}?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true });