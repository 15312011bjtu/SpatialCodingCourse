









const movie_dataset = [
{
Web:"https://www.imdb.com/title/tt0068646/",
Name:"The Godfather",
Genres:['Crime', 'Drama'],
Poster:"https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
Storyline:"The Godfather Don Vito Corleone is the head of the Corleone mafia family in New York. He is at the event of his daughter's wedding. Michael, Vito's youngest son and a decorated WW II Marine is also present at the wedding. Michael seems to be uninterested in being a part of the family business. Vito is a powerful man, and is kind to all those who give him respect but is ruthless against those who do not. But when a powerful and treacherous rival wants to sell drugs and needs the Don's influence for the same, Vito refuses to do it. What follows is a clash between Vito's fading old values and the new ways which may cause Michael to do the thing he was most reluctant in doing and wage a mob war against all the other mafia families which could tear the Corleone family apart. —srijanarora-152-448595",
Tagline:"TaglinesAn offer you can't refuse.",
Country_of_origin:['United States'],
Director:['Francis Ford Coppola'],
Writer:['Mario Puzo', 'Francis Ford Coppola'],
Stars:['Marlon Brando', 'Al Pacino', 'James Caan'],
Release_year:1972.0,
},
{
Web:"https://www.imdb.com/title/tt0111161/",
Name:"The Shawshank Redemption",
Genres:['Drama'],
Poster:"https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
Storyline:"Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red. —J-S-Golden",
Tagline:"TaglinesFear can hold you prisoner. Hope can set you free.",
Country_of_origin:['United States'],
Director:['Frank Darabont'],
Writer:['Stephen King', 'Frank Darabont'],
Stars:['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
Release_year:1994.0,
},
];






const searchBar = document.querySelector("input");
const movie_list = document.querySelector(".movie_list");

function search_movie(e) {
    if (e.keyCode === 13) /*keyCode===13， "Enter" button*/ {
        const searchString = e.target.value;
        const SearchedMovie = movie_dataset.filter(function (movies) {
            if (searchString) {
                return movies.Name.toLowerCase().includes(searchString.toLowerCase());
            }
        });
        displaySearched(SearchedMovie);
    }
}


function displaySearched(SearchedMovie) /*input SearchedMovie, a list of included movie_dataset*/{
    clearList();
    for (let i = 0; i < SearchedMovie.length; i++) {
        // add movie container
        let list_item_left = document.createElement("li");
        list_item_left.classList.add('movielist_container');
        movie_list.appendChild(list_item_left); 


        // add each info to the container
        let title_left = document.createElement("h3");
        title_left.textContent = SearchedMovie[i].Name;
        title_left.selectedMovie = SearchedMovie[i]; //额外赋值，方便传递
        title_left.addEventListener('click', RenderSelectedInfo);
        list_item_left.appendChild(title_left);

        let poster_left = document.createElement("img");
        poster_left.setAttribute("src", SearchedMovie[i].Poster);
        poster_left.classList.add('poster_left');
        poster_left.selectedMovie = SearchedMovie[i]; //额外赋值，方便传递
        poster_left.addEventListener('click', RenderSelectedInfo);
        list_item_left.appendChild(poster_left);

        
        let year_left = document.createElement("p");
        year_left.textContent = SearchedMovie[i].Release_year;
        list_item_left.appendChild(year_left);
    }

}


const main_poster = document.querySelector(".main_poster");
const text_list = document.querySelector('.text_list')

function RenderSelectedInfo(e) {
    clearMainInfo()

    /* poster */
    let poster_right = document.createElement("img");
    poster_right.setAttribute("src", this.selectedMovie.Poster);
    poster_right.setAttribute("width","100%");
    main_poster.appendChild(poster_right);

    /*  text list of info */
    let Name = document.createElement("li"); // name
    Name.textContent = "Name: " + this.selectedMovie.Name;
    text_list.appendChild(Name);
    let Year = document.createElement("li"); // year
    Year.textContent = "Release Year: " + this.selectedMovie.Release_year;
    text_list.appendChild(Year);
    let Contry = document.createElement("li"); // country
    Contry.textContent = "Contry: " + this.selectedMovie.Country_of_origin.join(", ")
    text_list.appendChild(Contry);
    let Genre = document.createElement("li"); // genre
    Genre.textContent = "Genres: " + this.selectedMovie.Genres.join(", ")
    text_list.appendChild(Genre);
    let Director = document.createElement("li"); // director
    Director.textContent = "Director: " + this.selectedMovie.Director.join(", ")
    text_list.appendChild(Director);
    let Writer = document.createElement("li"); //Writer
    Writer.textContent = "Writer: " + this.selectedMovie.Writer.join(", ")
    text_list.appendChild(Writer);
    let Stars = document.createElement("li"); //Stars
    Stars.textContent = "Stars: " + this.selectedMovie.Stars.join(", ")
    text_list.appendChild(Stars);
    let Tagline = document.createElement("li"); // Tagline
    Tagline.textContent = "Tagline: " + this.selectedMovie.Tagline;
    text_list.appendChild(Tagline);
    let Storyline = document.createElement("li"); // Storyline
    Storyline.textContent = "Storyline: " + this.selectedMovie.Storyline;
    text_list.appendChild(Storyline);

    /* related movies */
}


function clearList() {
    movie_list.innerHTML = "";
}


function clearMainInfo() {
    main_poster.innerHTML = "";
    text_list.innerHTML = "";
    // TBC, info list, related movies
}








searchBar.addEventListener("keyup", search_movie);