//영화 DB가져오기
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODI4NzdkZmQzOTRmNzRkZmQ0YmQ4M2E5MWJhOWRkMSIsInN1YiI6IjY1MmY4ODI2MzU4ZGE3NWI2MWY5ZTg4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Dhw6p5_0Qh0pVWyQiquPzTrZJcmfiO1SU2nGz8oL7og'
    }
};
const movie_list = document.querySelector(".card_list")

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
        movies = response.results


        showMovieList(movies)
    })
    .catch(err => console.error(err));

//영화 보여주기
function showMovieList(movies) {

    movies.forEach(a => {
        let { title, id, overview, vote_average, poster_path, release_date } = a

        //front
        const movie_card = document.createElement('div')
        movie_card.classList.add('movie_card')
        movie_list.append(movie_card)
        const append_front_card = document.createElement('div')
        append_front_card.classList.add('card')
        append_front_card.classList.add('card_front')
        const front_temp_html =
            `
                <img src="https://image.tmdb.org/t/p/w200/${poster_path}" class="movie_image" alt="...">
                <div class="movie_title">${title}</div>
                <div class="star">🎦${release_date} ⭐${vote_average}</div>
            `
        append_front_card.innerHTML = front_temp_html
        movie_card.append(append_front_card);

        //middle
        const append_middle_card = document.createElement('div')
        append_middle_card.classList.add('card')
        append_middle_card.classList.add('card_middle')
        let middle_temp_html = `<div class="movie_story">${overview}</div>`
        append_middle_card.innerHTML = middle_temp_html;
        movie_card.append(append_middle_card)

        //back
        const back_card = document.createElement('div')
        let back_temp_html = `<div class="card card_back" style="background-image: url(https://image.tmdb.org/t/p/w200/${poster_path})"></div>`
        back_card.innerHTML = back_temp_html
        movie_card.append(back_card)

        call_id = () => {
            alert(title + ' ID : ' + id)
        }

        back_card.addEventListener('click', call_id)
    })
}

// //영화이름찾기
const searchBox = document.querySelector('.searchBox')
const searchStr = document.querySelector('#strSearch')
const no = document.querySelector('.noMovie')

function searchMovie(e) {
    e.preventDefault();
    const wantAll = document.querySelectorAll('.movie_card')
    wantAll.forEach(a => {
        a.classList.remove('block')
    })
    no.innerHTML = ''

    const search_title = searchStr.value.toUpperCase()
    const title = document.querySelectorAll(".movie_title")
    console.log(title)

    const title_box = Array.from(title)
    const sellectMovie = title_box.filter((a) => {
        const searched_title = a.innerHTML.toUpperCase()
        return !searched_title.includes(search_title)
    })
    sellectMovie.forEach(element => {
        element.parentNode.parentNode.classList.add('block')
    });

    let i = 0;
    wantAll.forEach(element => {
        if(element.classList.contains('block')){
            i += 1;
        }
    });
    if(i === wantAll.length){
        no.innerHTML = 'NO movie data.'
    }
}

searchStr.addEventListener('keyup', searchMovie)
window.addEventListener('submit', searchMovie)
