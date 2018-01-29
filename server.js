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
// const conString = 'postgres://localhost:5432/bookapp';

// connect to heroku db (comment out when testing locally)
const conString = process.env.DATABASE_URL;

// connect to our DB using pg
const client = new pg.Client(conString);
client.connect();


//=================================================
//middleware
  //cors cross origin scripting
app.use(cors());

 // this tells bodyparser to use JSON into and outof database
app.use(bodyParser.json());

 // this enables bodyparser to parse nested objects
app.use(bodyParser.urlencoded({ extended: true }));



//=================================================
//routes

 // this is a test for communication to the server.
 app.get('/', (req, res) => { res.send('communication test to server.js works'); });

//get book fields from db
app.get('/db/books', function(req, res) {
  client.query('SELECT * FROM books;')
  .then(function(data) {
    response.send(data);
  })
  .catch(function(err) {
    console.error('app.get fields from db', err);
  })
});

 //new book form post route
 app.post('/db/books', function(req,res) {
   client.query(`
      INSERT INTO books(author, title, isbn, image_url, description)
      VALUES($1, $2, $3, $4, $5);`,
      [
        req.body.author,
        req.body.title,
        req.body.isbn,
        req.body.image_url,
        req.body.description
      ]
    )
    .then(function(data) {
      response.redirect('/');
    })
    .catch(function(err) {
      console.error('new book post error', err);
    })
 }





//=================================================
//listen

createTable();

app.listen(PORT, () => {
  console.log('Server is started and listening on PORT', PORT);
});

//if no db table exists, create one on server.js load
function createTable() {
  client.query(`
    CREATE TABLE IF NOT EXISTS  books(
      book_id SERIAL PRIMARY KEY,
      author VARCHAR(255),
      title  VARCHAR(255),
      isbn VARCHAR(255),
      image_url VARCHAR(255),
      description TEXT NOT NULL
    );
  `)
  .then(function(res) {
    console.log('Created Table');
  })
  .catch(function(err) {
    console.error('createTable Catch Error', err);
  })
  ;
}