// Used to interact with the API, generate your own here: http://www.omdbapi.com/apikey.aspx
const API_KEY = "d37041e5";
const ASYNCHRONOUS = true;
const MOVIES_ELEMENT = document.getElementById("movies");

// The movies filtered by the current search
var filteredMovies = [];

// Load favorite movies when we enter the file
var favoriteMovies = [];
httpGetAsync('/favorites', movies => {
    favoriteMovies = JSON.parse(movies);
    console.log(movies);
});

// Get movies from server then pass them to the updateMovies method
function fetchAndUpdateMovies() {
    // Extract the movie title from the search bar
    let movieTitleElement = document.getElementById("movieTitle");
    let movieTitle = movieTitleElement.value;

    // Make sure the title is valid
    if (!movieTitle) {
        console.log(movieTitle);
        console.log("Invalid movie title.");
        return;
    }

    httpGetAsync("http://www.omdbapi.com/?apikey=" + API_KEY + "&s=" + movieTitle,
        response => {
            // Update movies listed with results from api
            updateMovies(JSON.parse(response).Search)
    });
}

function updateMovies(movies) {
    filteredMovies = movies;
    removeCurrentMovies();
    addNewMovies();
}


function removeCurrentMovies() {
    // Remove all movies one by one
    MOVIES_ELEMENT.innerHTML = "";
}

function addNewMovies() {
    // For every movie
    filteredMovies.forEach(movie => {

        // Create a new html element for the movie
        // Making sure that the favorite button calls toggleFavorite
        var div = document.createElement("div");
        let buttonPrefix = "<button onClick=\"toggleFavorite(\'";
        let label = isFavorited(movie) ? "Unfavorite" : "Favorite";
        let buttonSuffix = "\')\">" + label + "</button>";
        div.innerHTML =
            '<h3>' +  movie.Title + '</h3>' +
            buttonPrefix + movie.imdbID + buttonSuffix;

        MOVIES_ELEMENT.appendChild(div);
    });
}

function getMovieFromId(movieImdbId) {
    return filteredMovies.find(movie => {return movie.imdbID === movieImdbId})
}

function isFavorited(movie) {
    // If favoriteMovies includes toggledMovie
    return favoriteMovies.some(favoriteMovie => favoriteMovie.imdbID === movie.imdbID);
}

function toggleFavorite(movieImdbId) {
    console.log("Favorite movies");
    console.log(favoriteMovies);

    console.log("Toggled movie");
    let toggledMovie = getMovieFromId(movieImdbId);


    if (isFavorited(toggledMovie)) {
        // Remove favorite movie
        httpPostAsync('/favorites/delete', toggledMovie, movies => {
            favoriteMovies = movies;
            updateMovies(filteredMovies)
        });
    } else {
        // Add movie
        httpPostAsync('/favorites', toggledMovie, movies => {
            favoriteMovies = movies;
            updateMovies(filteredMovies)
        });
    }


}