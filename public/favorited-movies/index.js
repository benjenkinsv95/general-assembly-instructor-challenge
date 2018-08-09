// Load favorite movies when we enter the file
var favoriteMovies = [];

httpGetAsync('/favorites', movies => {
    favoriteMovies = JSON.parse(movies);
    console.log("Loading favorite movies");
    console.log(movies);
    updateMovies(favoriteMovies);
});