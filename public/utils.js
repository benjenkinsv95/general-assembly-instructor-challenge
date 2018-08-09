// Gross to have this in global space. But unfamiliar with vanilla javascript
// Typically use TypeScript (Angular) doing webdev.
const MOVIES_ELEMENT = document.getElementById("movies");

// The movies filtered by the current search
var filteredMovies = [];

// Movies displaying detailed info
var detailedInfoMovies = [];

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
        let label = isFavorited(movie) ? "Unfavorite" : "Favorite";
        let detailedInfo = !isShowingDetailedInfo(movie) ? "" :
            '<h4>Year</h4>' + movie.Year +
            '<h4>Type</h4>' + movie.Type +
            '<h4>IMDB ID</h4>' + movie.imdbID;
        div.innerHTML =
            '<div class="movie" onclick="toggleDetailedInfo(\'' + movie.imdbID + '\')">'+
            '<h3>' +  movie.Title + '</h3>' +
            '<img src="' + movie.Poster +'">' +
            detailedInfo +
            '</div>' +
            "<button onClick=\"toggleFavorite(\'" + movie.imdbID +  "\')\">" + label + "</button>";

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

function isShowingDetailedInfo(movie) {
    return detailedInfoMovies.some(detailedMovie => detailedMovie.imdbID === movie.imdbID);
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

function toggleDetailedInfo(movieImdbId) {
    let toggledMovie = getMovieFromId(movieImdbId);

    if (isShowingDetailedInfo(toggledMovie)) {
        // remove detailed display
        let index = detailedInfoMovies.indexOf(toggledMovie)
        detailedInfoMovies.splice(index, 1)
    } else {
        // Added movie
        detailedInfoMovies.push(toggledMovie);
    }
    updateMovies(filteredMovies);
}