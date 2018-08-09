const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));

// Load the favorite movies from favorited-movies.json
app.get('/favorites', function(req, res) {
    const data = fs.readFileSync('./favorited-movies.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
});

// Save a new favorited movie
app.post('/favorites', function(req, res){
  if(!req.body.Title || !req.body.imdbID) {
      res.status(500);
      res.send("Error");
      return;
  }

  // Load favorites
  const favoritedMovies = JSON.parse(fs.readFileSync('./favorited-movies.json'));

  // Add new favorite to existing favorites
  favoritedMovies.push(req.body);

  // Save new favorited movies
  fs.writeFile('./favorited-movies.json', JSON.stringify(favoritedMovies));

  // Return the updated favorited moviews
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(favoritedMovies));
});

// Delete an unfavorited movie
// Contains a decent amount of duplication with previous method which could be removed by passing a
// function in to edit (add/delete) an element. Advanced students might try that!
app.post('/favorites/delete', function(req, res){
    if(!req.body.Title || !req.body.imdbID) {
        res.status(500);
        res.send("Error");
        return;
    }

    // Load favorites
    var favoritedMovies = JSON.parse(fs.readFileSync('./favorited-movies.json'));

    // Remove favorite if it exists
    var favoriteMovie = favoritedMovies.find(favoriteMovie => favoriteMovie.imdbID === req.body.imdbID);
    if (favoriteMovie) {
      let index = favoritedMovies.indexOf(favoriteMovie);
      favoritedMovies.splice(index, 1);
    }

    // Save updated favorited movies
    fs.writeFile('./favorited-movies.json', JSON.stringify(favoritedMovies));

    // Return the updated favorited moviews
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(favoritedMovies));
});

app.listen(8080, function(){
  console.log("Listening on port 8080");
});