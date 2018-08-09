// Used to interact with the API, generate your own here: http://www.omdbapi.com/apikey.aspx
const API_KEY = "d37041e5";

// Load favorite movies when we enter the file
var favoriteMovies = [];
httpGetAsync('/favorites', movies => {
    favoriteMovies = JSON.parse(movies);
    console.log("Loading favorite movies");
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
            let movies = JSON.parse(response).Search;
            if (!movies) {
                alert("Cant find any movies.");
                return;
            }

            // Update movies listed with results from api
            updateMovies(movies)
    });
}

