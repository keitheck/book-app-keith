'use strict';

//CORS cross origin resourse sharing, allows access from all ip's
const cors = require('cors');
//EXPRESS allows server side JavaScript to be executed
const express = require('express');
// POSTGRESS access the postgresSQL database
const pg = require('pg');
// BODY PARSER is middleware that allows parsing of incoming request bodies in middleware 
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// connect to local database run pgstart psql \c book_app to connect locally
const conString = 'postgres://localhost:5432/bookapp';

// connect to heroku db (comment out when testing locally)
// const conString = process.env.DATABASE_URL;

// connect to our DB
const client = new pg.Client(conString);
client.connect();


//=================================================
//middleware


//=================================================
//routes


//=================================================
//listen

app.listen(PORT, () => {
  console.log('Server is started and listening on PORT', PORT);
});