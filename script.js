const API_KEY = "7e4e6c58234b38a185465287a97f45c8";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");
const movieContainer = document.getElementById("movie-container");
async function fetchMovies(query) {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    displayMovies(data.results);
}
function displayMovies(movies) {
    movieContainer.innerHTML = "";
    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <p>⭐ ${movie.vote_average}</p>
                <p>${movie.release_date}</p>
            </div>
        `;
        movieElement.onclick = () => showMovieDetails(movie);
        movieContainer.appendChild(movieElement);
    });
}
async function showMovieDetails(movie) {
    const response = await fetch(`${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}`);
    const data = await response.json();
    document.getElementById("movie-title").innerText = data.title;
    document.getElementById("movie-poster").src = IMG_URL + data.poster_path;
    document.getElementById("movie-rating").innerText = data.vote_average;
    document.getElementById("movie-date").innerText = data.release_date;
    document.getElementById("movie-overview").innerText = data.overview;
    document.getElementById("trailer-modal").style.display = "flex";
}
function closeModal() {
    document.getElementById("trailer-modal").style.display = "none";
}
searchBtn.addEventListener("click", () => {
    const query = searchInput.value;
    if (query) {
        fetchMovies(query);
    }
});
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});