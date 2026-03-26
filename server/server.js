const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();

// Parse JSON form client (for PUT)
app.use(bodyParser.json()); 

// Serve static content in directory 'files' (index.htm, css, js etc)
app.use(express.static(path.join(__dirname, 'files')));

// 1.2 Endpoint 
app.get('/movies', function (req, res) {
    const moviesArray = Object.values(movieModel);
  res.json(moviesArray);
});

// 2.1 'GET' endpoint for specific movie
app.get('/movies/:imdbID', function (req, res) {
  const imdbID = req.params.imdbID;
  console.log(`Requested movie: ${imdbID}`);
  
  const movie = movieModel[imdbID]
  

  if (movie) {
    console.log(`Found: ${movie.Title}`)
    res.json(movie);  //found -> send movie
  } else {
    console.log(`Movie ${imdbID} not found`)
    res.sendStatus(404); //not found -> 404
  }
});

/* Task 3.1 and 3.2.
   - Add a new PUT endpoint
   - Check whether the movie sent by the client already exists 
     and continue as described in the assignment */

app.listen(3000);

console.log("Server now listening on http://localhost:3000/");

console.log("Movies loaded: ", Object.keys(movieModel));
console.log("Total movies: ", Object.keys(movieModel).length);
