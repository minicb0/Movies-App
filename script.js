// API KEY
var API_KEY = '8c8ccf4ac2dda7b2ab4662c892006f5e'

// declaring variables
var searchBtn = document.getElementById('searchBtn');
var search = document.getElementById('search');
var movieContainer = document.getElementById('movieContainer')
var movieWrapper = document.getElementsByClassName('movieWrapper')

// event listener to search button
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    fetchMovie(search.value);
})

async function fetchMovie(movieName) {
    try {
        var movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieName}`
        let responseMovie = await fetch(movieURL);
        let movieData = await responseMovie.json();
        // console.log(movieData.results[0])
        // console.log(movieData.results[0].cast)

        var movieCastURL = `https://api.themoviedb.org/3/movie/${movieData.results[0].id}/credits?api_key=${API_KEY}`
        let responseCast = await fetch(movieCastURL);
        let movieCastData = await responseCast.json();

        // remove the previous childs
        movieContainer.removeChild(movieContainer.firstElementChild);

        var element = `
            <div class="movieWrapper">
            <div class="imageDiv">
                <img id="moviePoster" src="https://image.tmdb.org/t/p/w500${movieData.results[0].poster_path}">
            </div>
            <div class="contentDiv">
                <ul>
                    <li>
                        <i class="fas fa-film"></i>
                        <strong>Title: </strong> ${movieData.results[0].title}
                    </li>
                    <li>
                        <i class="fas fa-file"></i>
                        <strong>Description: </strong> ${movieData.results[0].overview}
                    </li>
                    <li>
                        <i class="fab fa-imdb"></i>
                        <strong>IMDB Ratings: </strong> ${movieData.results[0].vote_average}
                    </li>
                    <li>
                        <i class="fas fa-chart-line"></i>
                        <strong>Popularity: </strong> ${Math.floor(movieData.results[0].popularity)}%
                    </li>
                    <li id="castPics">
                        <i class="fas fa-users"></i>
                        <strong >Casts: </strong> <span id="castNames"></span> <br>
                    </li>
                </ul>
            </div>
            </div>`

        movieContainer.insertAdjacentHTML('beforeend', element)
        
        for (let i = 0; i < 6; i++) {
            if (i == 0) {
                document.getElementById('castNames').innerHTML = `${movieCastData.cast[i].name}`
            } else {
                document.getElementById('castNames').innerHTML += `, ${movieCastData.cast[i].name}`
            }

            var castImage = `
                <img class="castImage" src="https://image.tmdb.org/t/p/w500${movieCastData.cast[i].profile_path}">
                `
            document.getElementById('castPics').insertAdjacentHTML('beforeend', castImage)
        }
    } catch (err) {
        movieWrapper[0].innerHTML = "Sorry! We are unable to grab this movie from our API. Kindly search some other movie."
    }
}
