














const searchBar = document.querySelector("input");
const movie_list = document.querySelector(".movie_list");
const screen_SearchTarget = document.querySelector(".screen_SearchTarget")
const storyline = document.querySelector(".storyline");

const related_genre = document.getElementById("Genre");
const related_year = document.getElementById("Release_Year");
const related_country = document.getElementById("Country_of_origin");
const related_director = document.getElementById("Director");
const related_rating = document.getElementById("Rating");



function search_movie(e) {
    if (e.keyCode === 13) /*keyCode===13， "Enter" button*/ {
        clearList();
        screen_SearchTarget.innerHTML = "Search Result of 《"+ this.value + "》";

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
    poster_right.setAttribute("width", "90%"); //主海报,占.main_poster的大小，
    main_poster.appendChild(poster_right);

    /*  text list of info */
    let Name = document.createElement("li"); // name
    Name.textContent = "Name: " + this.selectedMovie.Name;
    text_list.appendChild(Name);
    let Rating = document.createElement("li"); // rating
    Rating.textContent = "Rating (IMDB): " + this.selectedMovie.Rating;
    text_list.appendChild(Rating);
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


    /* storyline of the movie */
    let storyline_text = document.createElement("p"); 
    storyline_text.textContent = "Storyline: " + this.selectedMovie.Storyline;
    storyline.appendChild(storyline_text);



    /* related movies */
    // SearchedMovie is the main operated lists. a section includes set string, find searchMovie, remove self, sort, limit 10, append poster.
    // related Genres
    let searchString = this.selectedMovie.Genres; 
    let SearchedMovie = movie_dataset.filter(function (f) {
        if (searchString) {
            return searchString.every(i => f.Genres.includes(i))//every还是some区分是含有全部还是部分
        }
    });
    let index_selectedMovie = SearchedMovie.indexOf(this.selectedMovie) // find the index of selectedMovie
    SearchedMovie.splice(index_selectedMovie, 1); // 2nd parameter means remove one item only
    SearchedMovie.sort((a, b) => parseFloat(b.Rating) - parseFloat(a.Rating)); // descending order by IMDB Rating
    if (SearchedMovie.length > 10) /* limit the length below 10 */{
        SearchedMovie = SearchedMovie.slice(0,10)
    }
    for (let i = 0; i < SearchedMovie.length; i++) {
        let poster_related = document.createElement("img");
        poster_related.setAttribute("src", SearchedMovie[i].Poster);
        poster_related.classList.add('poster_related');
        poster_related.selectedMovie = SearchedMovie[i]; //额外赋值，方便传递
        poster_related.addEventListener('click', RenderSelectedInfo);
        related_genre.appendChild(poster_related);
    }
    // relate Release Year
    searchString = this.selectedMovie.Release_year;
    SearchedMovie = movie_dataset.filter(function (f) {
        if (searchString) {
            return f.Release_year === searchString    //not list, do not use ".every"
        }
        //return movies.Name.toLowerCase().includes(searchString.toLowerCase());
    });
    index_selectedMovie = SearchedMovie.indexOf(this.selectedMovie) // find the index of selectedMovie
    SearchedMovie.splice(index_selectedMovie, 1); // 2nd parameter means remove one item only
    SearchedMovie.sort((a, b) => parseFloat(b.Rating) - parseFloat(a.Rating)); // descending order by IMDB Rating
    if (SearchedMovie.length > 10) /* limit the length below 10 */ {
        SearchedMovie = SearchedMovie.slice(0, 10)
    }
    for (let i = 0; i < SearchedMovie.length; i++) {
        let poster_related = document.createElement("img");
        poster_related.setAttribute("src", SearchedMovie[i].Poster);
        poster_related.classList.add('poster_related');
        poster_related.selectedMovie = SearchedMovie[i]; //额外赋值，方便传递
        poster_related.addEventListener('click', RenderSelectedInfo);
        related_year.appendChild(poster_related);
    }
    //relate Country_of_origin
    searchString = this.selectedMovie.Country_of_origin;
    SearchedMovie = movie_dataset.filter(function (f) {
        if (searchString) {
            return searchString.every(i => f.Country_of_origin.includes(i))//every还是some区分是含有全部还是部分
        }
    });
    index_selectedMovie = SearchedMovie.indexOf(this.selectedMovie) // find the index of selectedMovie
    SearchedMovie.splice(index_selectedMovie, 1); // 2nd parameter means remove one item only
    SearchedMovie.sort((a, b) => parseFloat(b.Rating) - parseFloat(a.Rating)); // descending order by IMDB Rating
    if (SearchedMovie.length > 10) /* limit the length below 10 */ {
        SearchedMovie = SearchedMovie.slice(0, 10)
    }
    for (let i = 0; i < SearchedMovie.length; i++) {
        let poster_related = document.createElement("img");
        poster_related.setAttribute("src", SearchedMovie[i].Poster);
        poster_related.classList.add('poster_related');
        poster_related.selectedMovie = SearchedMovie[i]; //额外赋值，方便传递
        poster_related.addEventListener('click', RenderSelectedInfo);
        related_country.appendChild(poster_related);
    }
    //relate Director
    searchString = this.selectedMovie.Director;
    SearchedMovie = movie_dataset.filter(function (f) {
        if (searchString) {
            return searchString.every(i => f.Director.includes(i))//every还是some区分是含有全部还是部分
        }
    });
    index_selectedMovie = SearchedMovie.indexOf(this.selectedMovie) // find the index of selectedMovie
    SearchedMovie.splice(index_selectedMovie, 1); // 2nd parameter means remove one item only
    SearchedMovie.sort((a, b) => parseFloat(b.Rating) - parseFloat(a.Rating)); // descending order by IMDB Rating
    if (SearchedMovie.length > 10) /* limit the length below 10 */ {
        SearchedMovie = SearchedMovie.slice(0, 10)
    }
    for (let i = 0; i < SearchedMovie.length; i++) {
        let poster_related = document.createElement("img");
        poster_related.setAttribute("src", SearchedMovie[i].Poster);
        poster_related.classList.add('poster_related');
        poster_related.selectedMovie = SearchedMovie[i]; //额外赋值，方便传递
        poster_related.addEventListener('click', RenderSelectedInfo);
        related_director.appendChild(poster_related);
    }
    //relate Rating
    searchString = this.selectedMovie.Rating;
    SearchedMovie = movie_dataset.filter(function (f) {
        if (searchString) {
            return f.Rating === searchString  //not list, do not use ".every"
        }
    });
    index_selectedMovie = SearchedMovie.indexOf(this.selectedMovie) // find the index of selectedMovie
    SearchedMovie.splice(index_selectedMovie, 1); // 2nd parameter means remove one item only
    SearchedMovie.sort((a, b) => parseFloat(b.Rating) - parseFloat(a.Rating)); // descending order by IMDB Rating
    if (SearchedMovie.length > 10) /* limit the length below 10 */ {
        SearchedMovie = SearchedMovie.slice(0, 10)
    }
    for (let i = 0; i < SearchedMovie.length; i++) {
        let poster_related = document.createElement("img");
        poster_related.setAttribute("src", SearchedMovie[i].Poster);
        poster_related.classList.add('poster_related');
        poster_related.selectedMovie = SearchedMovie[i]; //额外赋值，方便传递
        poster_related.addEventListener('click', RenderSelectedInfo);
        related_rating.appendChild(poster_related);
    }

    //SearchedMovie


}




function clearList() {
    movie_list.innerHTML = "";
    screen_SearchTarget.innerHTML = "";
}


function clearMainInfo() {
    main_poster.innerHTML = "";
    text_list.innerHTML = "";
    storyline.innerHTML = "";
    related_genre.innerHTML = "";
    related_year.innerHTML = "";
    related_country.innerHTML = "";
    related_director.innerHTML = "";
    related_rating.innerHTML = "";
    
}








searchBar.addEventListener("keyup", search_movie);






// const movie_dataset = [ ];

const movie_dataset = [
    {
        Web: "https://www.imdb.com/title/tt0068646/",
        Name: "The Godfather",
        Rating: 9.2,
        Genres: ['Crime', 'Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "The Godfather 'Don' Vito Corleone is the head of the Corleone mafia family in New York. He is at the event of his daughter's wedding. Michael, Vito's youngest son and a decorated WW II Marine is also present at the wedding. Michael seems to be uninterested in being a part of the family business. Vito is a powerful man, and is kind to all those who give him respect but is ruthless against those who do not. But when a powerful and treacherous rival wants to sell drugs and needs the Don's influence for the same, Vito refuses to do it. What follows is a clash between Vito's fading old values and the new ways which may cause Michael to do the thing he was most reluctant in doing and wage a mob war against all the other mafia families which could tear the Corleone family apart. —srijanarora-152-448595",
        Tagline: "TaglinesAn offer you can't refuse.",
        Release_date: "Mar/24/1972",
        Country_of_origin: ['United States'],
        Director: ['Francis Ford Coppola'],
        Writer: ['Mario Puzo', 'Francis Ford Coppola'],
        Stars: ['Marlon Brando', 'Al Pacino', 'James Caan'],
        Release_year: 1972.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0111161/",
        Name: "The Shawshank Redemption",
        Rating: 9.3,
        Genres: ['Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        Storyline: "Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red. —J-S-Golden",
        Tagline: "TaglinesFear can hold you prisoner. Hope can set you free.",
        Release_date: "Oct/14/1994",
        Country_of_origin: ['United States'],
        Director: ['Frank Darabont'],
        Writer: ['Stephen King', 'Frank Darabont'],
        Stars: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
        Release_year: 1994.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0108052/",
        Name: "Schindler's List",
        Rating: 9.0,
        Genres: ['Biography', 'Drama', 'History'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        Storyline: "Oskar Schindler is a vain and greedy German businessman who becomes an unlikely humanitarian amid the barbaric German Nazi reign when he feels compelled to turn his factory into a refuge for Jews. Based on the true story of Oskar Schindler who managed to save about 1100 Jews from being gassed at the Auschwitz concentration camp, it is a testament to the good in all of us. —Harald Mayr <marvin@bike.augusta.de>",
        Tagline: "TaglinesWhoever saves one life, saves the world entire.",
        Release_date: "Feb/04/1994",
        Country_of_origin: ['United States'],
        Director: ['Steven Spielberg'],
        Writer: ['Thomas Keneally', 'Steven Zaillian'],
        Stars: ['Liam Neeson', 'Ralph Fiennes', 'Ben Kingsley'],
        Release_year: 1994.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0081398/",
        Name: "Raging Bull",
        Rating: 8.2,
        Genres: ['Biography', 'Drama', 'Sport'],
        Poster: "https://m.media-amazon.com/images/M/MV5BYjRmODkzNDItMTNhNi00YjJlLTg0ZjAtODlhZTM0YzgzYThlXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg",
        Storyline: "When Jake LaMotta steps into a boxing ring and obliterates his opponent, he's a prizefighter. But when he treats his family and friends the same way, he's a ticking time bomb, ready to go off at any moment. Though LaMotta wants his family's love, something always seems to come between them. Perhaps it's his violent bouts of paranoia and jealousy. This kind of rage helped make him a champ, but in real life, he winds up in the ring alone. —alfiehitchie",
        Tagline: "-",
        Release_date: "Dec/19/1980",
        Country_of_origin: ['United States'],
        Director: ['Martin Scorsese'],
        Writer: ['Jake LaMotta', 'Joseph Carter', 'Peter Savage'],
        Stars: ['Robert De Niro', 'Cathy Moriarty', 'Joe Pesci'],
        Release_year: 1980.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0034583/",
        Name: "Casablanca",
        Rating: 8.5,
        Genres: ['Drama', 'Romance', 'War'],
        Poster: "https://m.media-amazon.com/images/M/MV5BY2IzZGY2YmEtYzljNS00NTM5LTgwMzUtMzM1NjQ4NGI0OTk0XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg",
        Storyline: "The story of Rick Blaine, a cynical world-weary ex-patriate who runs a nightclub in Casablanca, Morocco during the early stages of WWII. Despite the pressure he constantly receives from the local authorities, Rick's cafe has become a kind of haven for refugees seeking to obtain illicit letters that will help them escape to America. But when Ilsa, a former lover of Rick's, and her husband, show up to his cafe one day, Rick faces a tough challenge which will bring up unforeseen complications, heartbreak and ultimately an excruciating decision to make. —Kyle Perez",
        Tagline: "TaglinesWhere Love Cuts as Deep as a Dagger!",
        Release_date: "Jan/23/1943",
        Country_of_origin: ['United States'],
        Director: ['Michael Curtiz'],
        Writer: ['Julius J. Epstein', 'Philip G. Epstein', 'Howard Koch'],
        Stars: ['Humphrey Bogart', 'Ingrid Bergman', 'Paul Henreid'],
        Release_year: 1943.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0033467/",
        Name: "Citizen Kane",
        Rating: 8.3,
        Genres: ['Drama', 'Mystery'],
        Poster: "https://m.media-amazon.com/images/M/MV5BYjBiOTYxZWItMzdiZi00NjlkLWIzZTYtYmFhZjhiMTljOTdkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "A group of reporters are trying to decipher the last word ever spoken by Charles Foster Kane, the millionaire newspaper tycoon: 'Rosebud.' The film begins with a news reel detailing Kane's life for the masses, and then from there, viewers are shown flashbacks from Kane's life. As the reporters investigate further, the viewers see a display of a fascinating man's rise to fame, and how he eventually fell off the top of the world. —Zack H. / edited by Rob",
        Tagline: "TaglinesRadio's Most Dynamic Artist . . The Man At Whose Voice A Nation Trembled . . . Now the screen's most exciting NEW star ! ORSON WELLES in the picture Hollywood said he'd never make",
        Release_date: "Sep/05/1941",
        Country_of_origin: ['United States'],
        Director: ['Orson Welles'],
        Writer: ['Herman J. Mankiewicz', 'Orson Welles', 'John Houseman'],
        Stars: ['Orson Welles', 'Joseph Cotten', 'Dorothy Comingore'],
        Release_year: 1941.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0031381/",
        Name: "Gone with the Wind",
        Rating: 8.2,
        Genres: ['Drama', 'History', 'Romance'],
        Poster: "https://m.media-amazon.com/images/M/MV5BYjUyZWZkM2UtMzYxYy00ZmQ3LWFmZTQtOGE2YjBkNjA3YWZlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "Scarlett is a woman who can deal with a nation at war, Atlanta burning, the Union Army carrying off everything from her beloved Tara, the carpetbaggers who arrive after the war. Scarlett is beautiful. She has vitality. But Ashley, the man she has wanted for so long, is going to marry his placid cousin, Melanie. Mammy warns Scarlett to behave herself at the party at Twelve Oaks. There is a new man there that day, the day the Civil War begins. Rhett Butler. Scarlett does not know he is in the room when she pleads with Ashley to choose her instead of Melanie. —Dale O'Connor <daleoc@interaccess.com>",
        Tagline: "TaglinesFor the thousands who remember its unparalleled drama, action and romance! For the new thousands to whom the wonders will be revealed for the first time! Breathtaking spectacle, inspired acting by the greatest cast ever assembled! The screen's most exciting love story! The most-talked about picture ever made! [reissue]",
        Release_date: "Jan/17/1940",
        Country_of_origin: ['United States'],
        Director: ['Victor Fleming', 'George Cukor', 'Sam Wood'],
        Writer: ['Margaret Mitchell', 'Sidney Howard', 'Oliver H.P. Garrett'],
        Stars: ['Clark Gable', 'Vivien Leigh', 'Thomas Mitchell'],
        Release_year: 1940.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0032138/",
        Name: "The Wizard of Oz",
        Rating: 8.1,
        Genres: ['Adventure', 'Family', 'Fantasy'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNjUyMTc4MDExMV5BMl5BanBnXkFtZTgwNDg0NDIwMjE@._V1_.jpg",
        Storyline: "When a tornado rips through Kansas, Dorothy Gale and her dog, Toto, are whisked away in their house to the magical Land of Oz. They follow the Yellow Brick Road toward the Emerald City to meet the Wizard, and on the way they meet a Scarecrow who wants a brain, a Tin Man who wants a heart, and a Cowardly Lion who wants courage. The Wizard asks them to bring him the Wicked Witch of the West's broom to earn his help. —Jwelch5742",
        Tagline: "TaglinesMighty Miracle Show Of 1000 Delights !",
        Release_date: "Aug/25/1939",
        Country_of_origin: ['United States'],
        Director: ['Victor Fleming', 'George Cukor', 'Mervyn LeRoy'],
        Writer: ['Noel Langley', 'Florence Ryerson', 'Edgar Allan Woolf'],
        Stars: ['Judy Garland', 'Frank Morgan', 'Ray Bolger'],
        Release_year: 1939.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0073486/",
        Name: "One Flew Over the Cuckoo's Nest",
        Rating: 8.7,
        Genres: ['Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BZjA0OWVhOTAtYWQxNi00YzNhLWI4ZjYtNjFjZTEyYjJlNDVlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
        Storyline: "McMurphy has a criminal past and has once again gotten himself into trouble and is sentenced by the court. To escape labor duties in prison, McMurphy pleads insanity and is sent to a ward for the mentally unstable. Once here, McMurphy both endures and stands witness to the abuse and degradation of the oppressive Nurse Ratched, who gains superiority and power through the flaws of the other inmates. McMurphy and the other inmates band together to make a rebellious stance against the atrocious Nurse. —Jacob Oberfrank",
        Tagline: "TaglinesIf he's crazy, what does that make you?",
        Release_date: "Nov/19/1975",
        Country_of_origin: ['United States'],
        Director: ['Milos Forman'],
        Writer: ['Lawrence Hauben', 'Bo Goldman', 'Ken Kesey'],
        Stars: ['Jack Nicholson', 'Louise Fletcher', 'Michael Berryman'],
        Release_year: 1975.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0056172/",
        Name: "Lawrence of Arabia",
        Rating: 8.3,
        Genres: ['Adventure', 'Biography', 'Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BYWY5ZjhjNGYtZmI2Ny00ODM0LWFkNzgtZmI1YzA2N2MxMzA0XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_.jpg",
        Storyline: "Due to his knowledge of the native Bedouin tribes, British Lieutenant T.E. Lawrence is sent to Arabia to find Prince Faisal and serve as a liaison between the Arabs and the British in their fight against the Turks. With the aid of native Sherif Ali, Lawrence rebels against the orders of his superior officer and strikes out on a daring camel journey across the harsh desert to attack a well-guarded Turkish port. —Jwelch5742",
        Tagline: "TaglinesA Mighty Motion Picture Of Action And Adventure!",
        Release_date: "Dec/11/1962",
        Country_of_origin: ['United Kingdom'],
        Director: ['David Lean'],
        Writer: ['Robert Bolt', 'Michael Wilson'],
        Stars: ['Peter O&#x27;Toole', 'Alec Guinness', 'Anthony Quinn'],
        Release_year: 1962.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0052357/",
        Name: "Vertigo",
        Rating: 8.3,
        Genres: ['Mystery', 'Romance', 'Thriller'],
        Poster: "https://m.media-amazon.com/images/M/MV5BYTE4ODEwZDUtNDFjOC00NjAxLWEzYTQtYTI1NGVmZmFlNjdiL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg",
        Storyline: "Following his early retirement as a detective from the San Francisco Police Department, John Ferguson - Scottie to his friends - becomes obsessed with two women in succession, those obsessions which trouble his long time friend and former fiancée, Midge Wood, a designer of women's undergarments. The first is wealthy and elegant platinum blonde Madeleine Elster, the wife of his college acquaintance Gavin Elster, who hires John to follow her in Gavin's belief that she may be a danger to herself in thinking that she has recently been possessed by the spirit of Carlotta Valdes, Madeleine's great-grandmother who she knows nothing about, but who Gavin knows committed suicide in being mentally unbalanced when she was twenty-six, Madeleine's current age. The second is Judy Barton, who John spots on the street one day. Judy is a working class girl, but what makes John obsessed with her is that, despite her working class style and her brunette hair, she is the spitting image of Madeleine, into who he tries to transform Judy. The initial question that John has is if there is some connection between Madeleine and Judy. What happens between John and individually with Madeleine and Judy is affected by the reason John took that early retirement: a recent workplace incident that showed that he is acrophobic which leads to a severe case of vertigo whenever he looks down from tall heights. —Huggo",
        Tagline: "TaglinesA Hitchcock thriller. You should see it from the beginning!",
        Release_date: "May/22/1958",
        Country_of_origin: ['United States'],
        Director: ['Alfred Hitchcock'],
        Writer: ['Alec Coppel', 'Samuel A. Taylor', 'Pierre Boileau'],
        Stars: ['James Stewart', 'Kim Novak', 'Barbara Bel Geddes'],
        Release_year: 1958.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0054215/",
        Name: "Psycho",
        Rating: 8.5,
        Genres: ['Horror', 'Mystery', 'Thriller'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNTQwNDM1YzItNDAxZC00NWY2LTk0M2UtNDIwNWI5OGUyNWUxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "Phoenix office worker Marion Crane is fed up with the way life has treated her. She has to meet her lover Sam in lunch breaks, and they cannot get married because Sam has to give most of his money away in alimony. One Friday, Marion is trusted to bank forty thousand dollars by her employer. Seeing the opportunity to take the money and start a new life, Marion leaves town and heads towards Sam's California store. Tired after the long drive and caught in a storm, she gets off the main highway and pulls into the Bates Motel. The motel is managed by a quiet young man called Norman who seems to be dominated by his mother. —Col Needham <col@imdb.com>",
        Tagline: "TaglinesThe picture you MUST see from the beginning... Or not at all!... For no one will be seated after the start of... Alfred Hitchcock's greatest shocker Psycho.",
        Release_date: "Sep/08/1960",
        Country_of_origin: ['United States'],
        Director: ['Alfred Hitchcock'],
        Writer: ['Joseph Stefano', 'Robert Bloch'],
        Stars: ['Anthony Perkins', 'Janet Leigh', 'Vera Miles'],
        Release_year: 1960.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0071562/",
        Name: "The Godfather: Part II",
        Rating: 9.0,
        Genres: ['Crime', 'Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "The continuing saga of the Corleone crime family tells the story of a young Vito Corleone growing up in Sicily and in 1910s New York; and follows Michael Corleone in the 1950s as he attempts to expand the family business into Las Vegas, Hollywood and Cuba. —Keith Loh <loh@sfu.ca>",
        Tagline: "TaglinesAll the power on earth can't change destiny.",
        Release_date: "Dec/18/1974",
        Country_of_origin: ['United States'],
        Director: ['Francis Ford Coppola'],
        Writer: ['Francis Ford Coppola', 'Mario Puzo'],
        Stars: ['Al Pacino', 'Robert De Niro', 'Robert Duvall'],
        Release_year: 1974.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0047296/",
        Name: "On the Waterfront",
        Rating: 8.1,
        Genres: ['Crime', 'Drama', 'Thriller'],
        Poster: "https://m.media-amazon.com/images/M/MV5BY2I0MWFiZDMtNWQyYy00Njk5LTk3MDktZjZjNTNmZmVkYjkxXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg",
        Storyline: "Terry Malloy dreams about being a prize fighter, while tending his pigeons and running errands at the docks for Johnny Friendly, the corrupt boss of the dockers union. Terry witnesses a murder by two of Johnny's thugs, and later meets the dead man's sister and feels responsible for his death. She introduces him to Father Barry, who tries to force him to provide information for the courts that will smash the dock racketeers. —Colin Tinto <cst@imdb.com>",
        Tagline: "TaglinesThe Man Lived by the Jungle Law of the Docks!",
        Release_date: "Jun/22/1954",
        Country_of_origin: ['United States'],
        Director: ['Elia Kazan'],
        Writer: ['Budd Schulberg', 'Malcolm Johnson', 'Robert Siodmak'],
        Stars: ['Marlon Brando', 'Karl Malden', 'Lee J. Cobb'],
        Release_year: 1954.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0043014/",
        Name: "Sunset Blvd.",
        Rating: 8.4,
        Genres: ['Drama', 'Film-Noir'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMTU0NTkyNzYwMF5BMl5BanBnXkFtZTgwMDU0NDk5MTI@._V1_.jpg",
        Storyline: "In Hollywood of the 50's, the obscure screenplay writer Joe Gillis is not able to sell his work to the studios, is full of debts and is thinking in returning to his hometown to work in an office. While trying to escape from his creditors, he has a flat tire and parks his car in a decadent mansion in Sunset Boulevard. He meets the owner and former silent-movie star Norma Desmond, who lives alone with her butler and driver Max Von Mayerling. Norma is demented and believes she will return to the cinema industry, and is protected and isolated from the world by Max, who was her director and husband in the past and still loves her. Norma proposes Joe to move to the mansion and help her in writing a screenplay for her comeback to the cinema, and the small-time writer becomes her lover and gigolo. When Joe falls in love for the young aspirant writer Betty Schaefer, Norma becomes jealous and completely insane and her madness leads to a tragic end. —Claudio Carvalho, Rio de Janeiro, Brazil",
        Tagline: "TaglinesA Hollywood Story",
        Release_date: "Aug/04/1950",
        Country_of_origin: ['United States'],
        Director: ['Billy Wilder'],
        Writer: ['Charles Brackett', 'Billy Wilder', 'D.M. Marshman Jr.'],
        Stars: ['William Holden', 'Gloria Swanson', 'Erich von Stroheim'],
        Release_year: 1950.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0109830/",
        Name: "Forrest Gump",
        Rating: 8.8,
        Genres: ['Drama', 'Romance'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
        Storyline: "Forrest Gump is a simple man with a low I.Q. but good intentions. He is running through childhood with his best and only friend Jenny. His 'mama' teaches him the ways of life and leaves him to choose his destiny. Forrest joins the army for service in Vietnam, finding new friends called Dan and Bubba, he wins medals, creates a famous shrimp fishing fleet, inspires people to jog, starts a ping-pong craze, creates the smiley, writes bumper stickers and songs, donates to people and meets the president several times. However, this is all irrelevant to Forrest who can only think of his childhood sweetheart Jenny Curran, who has messed up her life. Although in the end all he wants to prove is that anyone can love anyone. —aliw135",
        Tagline: "TaglinesThe story of a lifetime.",
        Release_date: "Jul/06/1994",
        Country_of_origin: ['United States'],
        Director: ['Robert Zemeckis'],
        Writer: ['Winston Groom', 'Eric Roth'],
        Stars: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
        Release_year: 1994.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0059742/",
        Name: "The Sound of Music",
        Rating: 8.1,
        Genres: ['Biography', 'Drama', 'Family'],
        Poster: "https://m.media-amazon.com/images/M/MV5BM2Q3YWMzMWItMjY4NS00ZjQ4LWEwYzQtODMwMjU1ZDg4ZjA4XkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_.jpg",
        Storyline: "In 1930's Austria, a young woman named Maria (Dame Julie Andrews) is failing miserably in her attempts to become a nun. When Navy Captain Georg Von Trapp (Christopher Plummer) writes to the convent asking for a governess that can handle his seven mischievous children, Maria is given the job. The Captain's wife is dead, and he is often away, and runs the household as strictly as he does the ships he sails on. The children are unhappy and resentful of the governesses that their father keeps hiring, and have managed to run each of them off one by one. When Maria arrives, she is initially met with the same hostility, but her kindness, understanding, and sense of fun soon draws them to her and brings some much-needed joy into all their lives - including the Captain's. Eventually he and Maria find themselves falling in love, even though the Captain is already engaged to a Baroness named Elsa and Maria is still a postulant. The romance makes them both start questioning the decisions they have made. Their personal conflicts soon become overshadowed, however, by world events. Austria is about to come under the control of Germany, and the Captain may soon find himself drafted into the German Navy and forced to fight against his own country. —LOTUS73",
        Tagline: "TaglinesRADIANCE THAT FLOODS THE SCREEN...AND WARMS THE HEART!",
        Release_date: "Apr/01/1965",
        Country_of_origin: ['United States'],
        Director: ['Robert Wise'],
        Writer: ['Georg Hurdalek', 'Howard Lindsay', 'Russel Crouse'],
        Stars: ['Julie Andrews', 'Christopher Plummer', 'Eleanor Parker'],
        Release_year: 1965.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0050083/",
        Name: "12 Angry Men",
        Rating: 9.0,
        Genres: ['Crime', 'Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg",
        Storyline: "The defense and the prosecution have rested, and the jury is filing into the jury room to decide if a young man is guilty or innocent of murdering his father. What begins as an open-and-shut case of murder soon becomes a detective story that presents a succession of clues creating doubt, and a mini-drama of each of the jurors' prejudices and preconceptions about the trial, the accused, AND each other. Based on the play, all of the action takes place on the stage of the jury room. —pjk <PETESID@VNET.IBM.COM>",
        Tagline: "TaglinesLife Is In Their Hands -- Death Is On Their Minds!",
        Release_date: "Apr/10/1957",
        Country_of_origin: ['United States'],
        Director: ['Sidney Lumet'],
        Writer: ['Reginald Rose'],
        Stars: ['Henry Fonda', 'Lee J. Cobb', 'Martin Balsam'],
        Release_year: 1957.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0055614/",
        Name: "West Side Story",
        Rating: 7.6,
        Genres: ['Crime', 'Drama', 'Musical'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMTM0NDAxOTI5MF5BMl5BanBnXkFtZTcwNjI4Mjg3NA@@._V1_.jpg",
        Storyline: "West Side Story is the award-winning adaptation of the classic romantic tragedy 'Romeo and Juliet'. The feuding families become two warring New York City gangs--the white Jets led by Riff and the Latino Sharks, led by Bernardo. Their hatred escalates to a point where neither can coexist with any form of understanding. But when Riff's best friend (and former Jet) Tony and Bernardo's younger sister Maria meet at a dance, no one can do anything to stop their love. Maria and Tony begin meeting in secret, planning to run away. Then the Sharks and Jets plan a rumble under the highway--whoever wins gains control of the streets. Maria sends Tony to stop it, hoping it can end the violence. It goes terribly wrong, and before the lovers know what's happened, tragedy strikes and doesn't stop until the climactic and heartbreaking ending. —Anonymous",
        Tagline: "Taglines'BEST PICTURE!' Winner of 10 Academy Awards! - 1961 (post-Oscar)",
        Release_date: "Dec/23/1961",
        Country_of_origin: ['United States'],
        Director: ['Jerome Robbins', 'Robert Wise'],
        Writer: ['Ernest Lehman', 'Arthur Laurents', 'Jerome Robbins'],
        Stars: ['Natalie Wood', 'George Chakiris', 'Richard Beymer'],
        Release_year: 1961.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0076759/",
        Name: "Star Wars",
        Rating: 8.6,
        Genres: ['Action', 'Adventure', 'Fantasy'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "The Imperial Forces, under orders from cruel Darth Vader, hold Princess Leia hostage in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker and Han Solo, captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 and C-3PO to rescue the beautiful princess, help the Rebel Alliance and restore freedom and justice to the Galaxy. —Jwelch5742",
        Tagline: "TaglinesIt's Back! The Force will be with you for three weeks only. (1979 Reissue Poster)",
        Release_date: "May/25/1977",
        Country_of_origin: ['United States'],
        Director: ['George Lucas'],
        Writer: ['George Lucas'],
        Stars: ['Mark Hamill', 'Harrison Ford', 'Carrie Fisher'],
        Release_year: 1977.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0062622/",
        Name: "2001: A Space Odyssey",
        Rating: 8.3,
        Genres: ['Adventure', 'Sci-Fi'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMmNlYzRiNDctZWNhMi00MzI4LThkZTctMTUzMmZkMmFmNThmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "'2001' is a story of evolution. Sometime in the distant past, someone or something nudged evolution by placing a monolith on Earth (presumably elsewhere throughout the universe as well). Evolution then enabled humankind to reach the moon's surface, where yet another monolith is found, one that signals the monolith placers that humankind has evolved that far. Now a race begins between computers (HAL) and human (Bowman) to reach the monolith placers. The winner will achieve the next step in evolution, whatever that may be. —Larry Cousins",
        Tagline: "TaglinesLet the Awe and Mystery of a Journey Unlike Any Other Begin",
        Release_date: "Jun/24/1970",
        Country_of_origin: ['United Kingdom', 'United States'],
        Director: ['Stanley Kubrick'],
        Writer: ['Stanley Kubrick', 'Arthur C. Clarke'],
        Stars: ['Keir Dullea', 'Gary Lockwood', 'William Sylvester'],
        Release_year: 1970.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0083866/",
        Name: "E.T. the Extra-Terrestrial",
        Rating: 7.9,
        Genres: ['Adventure', 'Family', 'Sci-Fi'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMTQ2ODFlMDAtNzdhOC00ZDYzLWE3YTMtNDU4ZGFmZmJmYTczXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
        Storyline: "After a gentle alien becomes stranded on Earth, the being is discovered and befriended by a young boy named Elliott. Bringing the extraterrestrial into his suburban California house, Elliott introduces E.T., as the alien is dubbed, to his brother and his little sister, Gertie, and the children decide to keep its existence a secret. Soon, however, E.T. falls ill, resulting in government intervention and a dire situation for both Elliott and the alien. —Jwelch5742",
        Tagline: "TaglinesHe is afraid. He is totally alone. He is 3 million light years from home.",
        Release_date: "Jun/11/1982",
        Country_of_origin: ['United States'],
        Director: ['Steven Spielberg'],
        Writer: ['Melissa Mathison'],
        Stars: ['Henry Thomas', 'Drew Barrymore', 'Peter Coyote'],
        Release_year: 1982.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0102926/",
        Name: "The Silence of the Lambs",
        Rating: 8.6,
        Genres: ['Crime', 'Drama', 'Thriller'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        Storyline: "F.B.I. trainee Clarice Starling (Jodie Foster) works hard to advance her career, while trying to hide or put behind her West Virginia roots, of which if some knew, would automatically classify her as being backward or white trash. After graduation, she aspires to work in the agency's Behavioral Science Unit under the leadership of Jack Crawford (Scott Glenn). While she is still a trainee, Crawford asks her to question Dr. Hannibal Lecter (Sir Anthony Hopkins), a psychiatrist imprisoned, thus far, for eight years in maximum security isolation for being a serial killer who cannibalized his victims. Clarice is able to figure out the assignment is to pick Lecter's brains to help them solve another serial murder case, that of someone coined by the media as 'Buffalo Bill' (Ted Levine), who has so far killed five victims, all located in the eastern U.S., all young women, who are slightly overweight (especially around the hips), all who were drowned in natural bodies of water, and all who were stripped of large swaths of skin. She also figures that Crawford chose her, as a woman, to be able to trigger some emotional response from Lecter. After speaking to Lecter for the first time, she realizes that everything with him will be a psychological game, with her often having to read between the very cryptic lines he provides. She has to decide how much she will play along, as his request in return for talking to him is to expose herself emotionally to him. The case takes a more dire turn when a sixth victim is discovered, this one from who they are able to retrieve a key piece of evidence, if Lecter is being forthright as to its meaning. A potential seventh victim is high profile Catherine Martin (Brooke Smith), the daughter of Senator Ruth Martin (Diane Baker), which places greater scrutiny on the case as they search for a hopefully still alive Catherine. Who may factor into what happens is Dr. Frederick Chilton (Anthony Heald), the warden at the prison, an opportunist who sees the higher profile with Catherine, meaning a higher profile for himself if he can insert himself successfully into the proceedings. —Huggo",
        Tagline: "TaglinesDr. Hannibal Lecter. Brilliant. Cunning. Psychotic. In his mind lies the clue to a ruthless killer. - Clarice Starling, FBI. Brilliant. Vulnerable. Alone. She must trust him to stop the killer.",
        Release_date: "Feb/14/1991",
        Country_of_origin: ['United States'],
        Director: ['Jonathan Demme'],
        Writer: ['Thomas Harris', 'Ted Tally'],
        Stars: ['Jodie Foster', 'Anthony Hopkins', 'Lawrence A. Bonney'],
        Release_year: 1991.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0071315/",
        Name: "Chinatown",
        Rating: 8.2,
        Genres: ['Drama', 'Mystery', 'Thriller'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMjJkMDZhYzItZTFhMi00ZGI4LThlNTAtZDNlYmEwNjFkNDYzXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
        Storyline: "In 1937 Los Angeles, private investigator Jake 'J.J.' Gittes specializes in cheating-spouse cases. His current target is Hollis Mulwray, high-profile chief engineer for the Los Angeles Department of Water and Power, whose wife suspects him of infidelity. In following Mulwray, Gittes witnesses some usual business dealings, such as a public meeting for construction of a new dam to create additional water supply for Los Angeles, as fresh water is vital to the growing community during the chronic drought; Mulwray opposes the dam. Eventually Gittes sees Mulwray meeting with an unknown young woman who isn't his wife. Once news of the supposed tryst between Mulwray and this woman hits the media, additional information comes to light that makes Gittes believe that Mulwray is being framed for something and that he himself is being set up. In his investigation of the issue behind Mulwray's framing and his own setup, Gittes is assisted by Mulwray's wife Evelyn, but he thinks she isn't being forthright with him. The further he gets into the investigation, the more secrets he uncovers about the Mulwrays' professional and personal dealings, including Mulwray's former business-partnership with Evelyn's father, Noah Cross. The identity of the unknown woman may be the key to uncovering the whole story. —Huggo",
        Tagline: "TaglinesYou get tough. You get tender. You get close to each other. Maybe you even get close to the truth.",
        Release_date: "Jun/20/1974",
        Country_of_origin: ['United States'],
        Director: ['Roman Polanski'],
        Writer: ['Robert Towne', 'Roman Polanski'],
        Stars: ['Jack Nicholson', 'Faye Dunaway', 'John Huston'],
        Release_year: 1974.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0050212/",
        Name: "The Bridge on the River Kwai",
        Rating: 8.2,
        Genres: ['Adventure', 'Drama', 'War'],
        Poster: "https://m.media-amazon.com/images/M/MV5BOGY5NmNlMmQtYzRlYy00NGQ5LWFkYjYtNzExZmQyMTg0ZDA0XkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg",
        Storyline: "During WW II, allied POWs in a Japanese internment camp are ordered to build a bridge to accommodate the Burma-Siam railway. Their instinct is to sabotage the bridge, but under the leadership of Colonel Nicholson they're persuaded the bridge should be built to help morale, spirit. At first, the prisoners admire Nicholson when he bravely endures torture rather than compromise his principles for the benefit of Japanese Commandant Colonel Saito, but soon they realise it's a monument to Nicholson, himself, as well as a form of collaboration with the enemy. —alfiehitchie",
        Tagline: "TaglinesThe towering triumph of adventure from the makers of 'Lawrence of Arabia.'",
        Release_date: "Dec/14/1957",
        Country_of_origin: ['United Kingdom', 'United States'],
        Director: ['David Lean'],
        Writer: ['Pierre Boulle', 'Carl Foreman', 'Michael Wilson'],
        Stars: ['William Holden', 'Alec Guinness', 'Jack Hawkins'],
        Release_year: 1957.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0045152/",
        Name: "Singin' in the Rain",
        Rating: 8.3,
        Genres: ['Comedy', 'Musical', 'Romance'],
        Poster: "https://m.media-amazon.com/images/M/MV5BZDRjNGViMjQtOThlMi00MTA3LThkYzQtNzJkYjBkMGE0YzE1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg",
        Storyline: "1927 Hollywood. Monumental Pictures' biggest stars, glamorous on-screen couple Lina Lamont and Don Lockwood, are also an off-screen couple if the trade papers and gossip columns are to be believed. Both perpetuate the public perception if only to please their adoring fans and bring people into the movie theaters. In reality, Don barely tolerates her, while Lina, despite thinking Don beneath her, simplemindedly believes what she sees on screen in order to bolster her own stardom and sense of self-importance. R.F. Simpson, Monumental's head, dismisses what he thinks is a flash in the pan: talking pictures. It isn't until The Jazz Singer (1927) becomes a bona fide hit which results in all the movie theaters installing sound equipment that R.F. knows Monumental, most specifically in the form of Don and Lina, have to jump on the talking picture bandwagon, despite no one at the studio knowing anything about the technology. Musician Cosmo Brown, Don's best friend, gets hired as Monumental's ideas man and musical director. And by this time, Don has secretly started dating Kathy Selden, a chorus girl who is trying to make it big in pictures herself. Don and Kathy's relationship is despite their less than friendly initial meeting. Cosmo and Kathy help Don, who had worked his way up through the movie ranks to stardom, try make the leap to talking picture stardom, with Kathy following along the way. However, they have to overcome the technological issues. But the bigger problem is Lina, who will do anything to ensure she also makes the successful leap into talking pictures, despite her own inabilities and at anyone and everyone else's expense if they get in her way, especially Kathy as Don's off screen girlfriend and possibly his new talking picture leading lady. —Huggo",
        Tagline: "TaglinesSingin' Swingin' Glorious Feelin' Technicolor Musical",
        Release_date: "Apr/11/1952",
        Country_of_origin: ['United States'],
        Director: ['Stanley Donen', 'Gene Kelly'],
        Writer: ['Betty Comden', 'Adolph Green'],
        Stars: ['Gene Kelly', 'Donald O&#x27;Connor', 'Debbie Reynolds'],
        Release_year: 1952.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0038650/",
        Name: "It's a Wonderful Life",
        Rating: 8.6,
        Genres: ['Drama', 'Family', 'Fantasy'],
        Poster: "https://m.media-amazon.com/images/M/MV5BZjc4NDZhZWMtNGEzYS00ZWU2LThlM2ItNTA0YzQ0OTExMTE2XkEyXkFqcGdeQXVyNjUwMzI2NzU@._V1_.jpg",
        Storyline: "George Bailey has spent his entire life giving of himself to the people of Bedford Falls. He has always longed to travel but never had the opportunity in order to prevent rich skinflint Mr. Potter from taking over the entire town. All that prevents him from doing so is George's modest building and loan company, which was founded by his generous father. But on Christmas Eve, George's Uncle Billy loses the business's $8,000 while intending to deposit it in the bank. Potter finds the misplaced money and hides it from Billy. When the bank examiner discovers the shortage later that night, George realizes that he will be held responsible and sent to jail and the company will collapse, finally allowing Potter to take over the town. Thinking of his wife, their young children, and others he loves will be better off with him dead, he contemplates suicide. But the prayers of his loved ones result in a gentle angel named Clarence coming to earth to help George, with the promise of earning his wings. He shows George what things would have been like if he had never been born. —alfiehitchie",
        Tagline: "TaglinesFrank Capra's...'It's a Wonderful Life'.",
        Release_date: "Jan/07/1947",
        Country_of_origin: ['United States'],
        Director: ['Frank Capra'],
        Writer: ['Frances Goodrich', 'Albert Hackett', 'Frank Capra'],
        Stars: ['James Stewart', 'Donna Reed', 'Lionel Barrymore'],
        Release_year: 1947.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0057012/",
        Name: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
        Rating: 8.4,
        Genres: ['Comedy', 'War'],
        Poster: "https://m.media-amazon.com/images/M/MV5BZWI3ZTMxNjctMjdlNS00NmUwLWFiM2YtZDUyY2I3N2MxYTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "Paranoid Brigadier General Jack D. Ripper of Burpelson Air Force Base, believing that fluoridation of the American water supply is a Soviet plot to poison the U.S. populace, is able to deploy through a back door mechanism a nuclear attack on the Soviet Union without the knowledge of his superiors, including the Chair of the Joint Chiefs of Staff, General Buck Turgidson, and President Merkin Muffley. Only Ripper knows the code to recall the B-52 bombers and he has shut down communication in and out of Burpelson as a measure to protect this attack. Ripper's executive officer, RAF Group Captain Lionel Mandrake (on exchange from Britain), who is being held at Burpelson by Ripper, believes he knows the recall codes if he can only get a message to the outside world. Meanwhile at the Pentagon War Room, key persons including Muffley, Turgidson and nuclear scientist and adviser, a former Nazi named Dr. Strangelove, are discussing measures to stop the attack or mitigate its blow-up into an all out nuclear war with the Soviets. Against Turgidson's wishes, Muffley brings Soviet Ambassador Alexi de Sadesky into the War Room, and get his boss, Soviet Premier Dimitri Kisov, on the hot line to inform him of what's going on. The Americans in the War Room are dismayed to learn that the Soviets have an as yet unannounced Doomsday Device to detonate if any of their key targets are hit. As Ripper, Mandrake and those in the War Room try and work the situation to their end goal, Major T.J. 'King' Kong, one of the B-52 bomber pilots, is working on his own agenda of deploying his bomb where ever he can on enemy soil if he can't make it to his intended target. —Huggo",
        Tagline: "TaglinesThe comedy classic from celebrated director STANLEY KUBRICK",
        Release_date: "Jan/29/1964",
        Country_of_origin: ['United Kingdom', 'United States'],
        Director: ['Stanley Kubrick'],
        Writer: ['Stanley Kubrick', 'Terry Southern', 'Peter George'],
        Stars: ['Peter Sellers', 'George C. Scott', 'Sterling Hayden'],
        Release_year: 1964.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0053291/",
        Name: "Some Like It Hot",
        Rating: 8.2,
        Genres: ['Comedy', 'Music', 'Romance'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNzAyOGIxYjAtMGY2NC00ZTgyLWIwMWEtYzY0OWQ4NDFjOTc5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        Storyline: "After two Chicago musicians, Joe and Jerry, witness the the St. Valentine's Day massacre, they want to get out of town and get away from the gangster responsible, Spats Colombo. They're desperate to get a gig out of town but the only job they know of is in an all-girl band heading to Florida. They show up at the train station as Josephine and Daphne, the replacement saxophone and bass players. They certainly enjoy being around the girls, especially Sugar Kane Kowalczyk who sings and plays the ukulele. Joe in particular sets out to woo her while Jerry/Daphne is wooed by a millionaire, Osgood Fielding III. Mayhem ensues as the two men try to keep their true identities hidden and Spats Colombo and his crew show up for a meeting with several other crime lords. —garykmcd",
        Tagline: "TaglinesNot since SCARFACE, so much action. Not since the Marx Brothers, so much comedy. Not since THE SEVEN YEAR ITCH, so much Marilyn.",
        Release_date: "Mar/19/1959",
        Country_of_origin: ['United States'],
        Director: ['Billy Wilder'],
        Writer: ['Billy Wilder', 'I.A.L. Diamond', 'Robert Thoeren'],
        Stars: ['Marilyn Monroe', 'Tony Curtis', 'Jack Lemmon'],
        Release_year: 1959.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0052618/",
        Name: "Ben-Hur",
        Rating: 8.1,
        Genres: ['Adventure', 'Drama', 'History'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNjgxY2JiZDYtZmMwOC00ZmJjLWJmODUtMTNmNWNmYWI5ODkwL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg",
        Storyline: "Judah Ben-Hur lives as a rich Jewish prince and merchant in Jerusalem at the beginning of the 1st century. Together with the new governor his old friend Messala arrives as commanding officer of the Roman legions. At first they are happy to meet after a long time but their different politic views separate them. During the welcome parade a roof tile falls down from Judah's house and injures the governor. Although Messala knows they are not guilty, he sends Judah to the galleys and throws his mother and sister into prison. But Judah swears to come back and take revenge. —Matthias Scheler <tron@lyssa.owl.de>",
        Tagline: "TaglinesA Tale of the Christ",
        Release_date: "Nov/18/1959",
        Country_of_origin: ['United States'],
        Director: ['William Wyler'],
        Writer: ['Lew Wallace', 'Karl Tunberg', 'Gore Vidal'],
        Stars: ['Charlton Heston', 'Jack Hawkins', 'Stephen Boyd'],
        Release_year: 1959.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0078788/",
        Name: "Apocalypse Now",
        Rating: 8.5,
        Genres: ['Drama', 'Mystery', 'War'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMDdhODg0MjYtYzBiOS00ZmI5LWEwZGYtZDEyNDU4MmQyNzFkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "It is the height of the war in Vietnam, and U.S. Army Captain Willard is sent by Colonel Lucas and a General to carry out a mission that, officially, 'does not exist - nor will it ever exist'. The mission: To seek out a mysterious Green Beret Colonel, Walter Kurtz, whose army has crossed the border into Cambodia and is conducting hit-and-run missions against the Viet Cong and NVA. The army believes Kurtz has gone completely insane and Willard's job is to eliminate him. Willard, sent up the Nung River on a U.S. Navy patrol boat, discovers that his target is one of the most decorated officers in the U.S. Army. His crew meets up with surfer-type Lt-Colonel Kilgore, head of a U.S Army helicopter cavalry group which eliminates a Viet Cong outpost to provide an entry point into the Nung River. After some hair-raising encounters, in which some of his crew are killed, Willard, Lance and Chef reach Colonel Kurtz's outpost, beyond the Do Lung Bridge. Now, after becoming prisoners of Kurtz, will Willard & the others be able to fulfill their mission? —Derek O'Cain",
        Tagline: "TaglinesThe Horror. . . The Horror. . .",
        Release_date: "Aug/15/1979",
        Country_of_origin: ['United States'],
        Director: ['Francis Ford Coppola'],
        Writer: ['John Milius', 'Francis Ford Coppola', 'Michael Herr'],
        Stars: ['Martin Sheen', 'Marlon Brando', 'Robert Duvall'],
        Release_year: 1979.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0086879/",
        Name: "Amadeus",
        Rating: 8.4,
        Genres: ['Biography', 'Drama', 'Music'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNWJlNzUzNGMtYTAwMS00ZjI2LWFmNWQtODcxNWUxODA5YmU1XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg",
        Storyline: "Antonio Salieri believes that Wolfgang Amadeus Mozart's music is divine and miraculous. He wishes he was himself as good a musician as Mozart so that he can praise the Lord through composing. He began his career as a devout man who believes his success and talent as a composer are God's rewards for his piety. He's also content as the respected, financially well-off, court composer of Austrian Emperor Joseph II. But he's shocked to learn that Mozart is such a vulgar creature, and can't understand why God favored Mozart to be his instrument. Salieri's envy has made him an enemy of God whose greatness was evident in Mozart. He is ready to take revenge against God and Mozart for his own musical mediocrity. —Khaled Salem",
        Tagline: "TaglinesThe man... The music... The madness... The murder... The motion picture...",
        Release_date: "Sep/19/1984",
        Country_of_origin: ['United States', 'France'],
        Director: ['Milos Forman'],
        Writer: ['Peter Shaffer', 'Zdenek Mahler'],
        Stars: ['F. Murray Abraham', 'Tom Hulce', 'Elizabeth Berridge'],
        Release_year: 1984.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0167260/",
        Name: "The Lord of the Rings: The Return of the King",
        Rating: 9.0,
        Genres: ['Action', 'Adventure', 'Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "The final confrontation between the forces of good and evil fighting for control of the future of Middle-earth. Frodo and Sam reach Mordor in their quest to destroy the One Ring, while Aragorn leads the forces of good against Sauron's evil army at the stone city of Minas Tirith. —Jwelch5742",
        Tagline: "TaglinesThe eye of the enemy is moving.",
        Release_date: "Dec/17/2003",
        Country_of_origin: ['New Zealand', 'United States'],
        Director: ['Peter Jackson'],
        Writer: ['J.R.R. Tolkien', 'Fran Walsh', 'Philippa Boyens'],
        Stars: ['Elijah Wood', 'Viggo Mortensen', 'Ian McKellen'],
        Release_year: 2003.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0172495/",
        Name: "Gladiator",
        Rating: 8.5,
        Genres: ['Action', 'Adventure', 'Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        Storyline: "Maximus is a powerful Roman general, loved by the people and the aging Emperor, Marcus Aurelius. Before his death, the Emperor chooses Maximus to be his heir over his own son, Commodus, and a power struggle leaves Maximus and his family condemned to death. The powerful general is unable to save his family, and his loss of will allows him to get captured and put into the Gladiator games until he dies. The only desire that fuels him now is the chance to rise to the top so that he will be able to look into the eyes of the man who will feel his revenge. —Chris 'Morphy' Terry",
        Tagline: "TaglinesFather of a murdered son, husband to a murdered wife and I shall have my vengeance in this life or the next",
        Release_date: "May/05/2000",
        Country_of_origin: ['United States', 'United Kingdom', 'Malta', 'Morocco'],
        Director: ['Ridley Scott'],
        Writer: ['David Franzoni', 'John Logan', 'William Nicholson'],
        Stars: ['Russell Crowe', 'Joaquin Phoenix', 'Connie Nielsen'],
        Release_year: 2000.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0120338/",
        Name: "Titanic",
        Rating: 7.9,
        Genres: ['Drama', 'Romance'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
        Storyline: "84 years later, a 100 year-old woman named Rose DeWitt Bukater tells the story to her granddaughter Lizzy Calvert, Brock Lovett, Lewis Bodine, Bobby Buell and Anatoly Mikailavich on the Keldysh about her life set in April 10th 1912, on a ship called Titanic when young Rose boards the departing ship with the upper-class passengers and her mother, Ruth DeWitt Bukater, and her fiancé, Caledon Hockley. Meanwhile, a drifter and artist named Jack Dawson and his best friend Fabrizio De Rossi win third-class tickets to the ship in a game. And she explains the whole story from departure until the death of Titanic on its first and last voyage April 15th, 1912 at 2:20 in the morning. —Anthony Pereyra <hypersonic91@yahoo.com>",
        Tagline: "TaglinesExperience It Like Never Before (3D re-release)",
        Release_date: "Dec/19/1997",
        Country_of_origin: ['United States', 'Mexico'],
        Director: ['James Cameron'],
        Writer: ['James Cameron'],
        Stars: ['Leonardo DiCaprio', 'Kate Winslet', 'Billy Zane'],
        Release_year: 1997.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0045793/",
        Name: "From Here to Eternity",
        Rating: 7.6,
        Genres: ['Drama', 'Romance', 'War'],
        Poster: "https://m.media-amazon.com/images/M/MV5BM2U3YzkxNGMtYWE0YS00ODk0LTk1ZGEtNjk3ZTE0MTk4MzJjXkEyXkFqcGdeQXVyNDk0MDg4NDk@._V1_.jpg",
        Storyline: "It's 1941. Robert E. Lee Prewitt has requested Army transfer and has ended up at Schofield in Hawaii. His new captain, Dana Holmes, has heard of his boxing prowess and is keen to get him to represent the company. However, 'Prew' is adamant that he doesn't box anymore, so Captain Holmes gets his subordinates to make his life a living hell. Meanwhile Sergeant Warden starts seeing the captain's wife, who has a history of seeking external relief from a troubled marriage. Prew's friend Maggio has a few altercations with the sadistic stockade Sergeant 'Fatso' Judson, and Prew begins falling in love with social club employee Lorene. Unbeknownst to anyone, the Japanese bombing of Pearl Harbor looms in the distance. —Ed Sutton <esutton@mindspring.com>",
        Tagline: "TaglinesPouring out of impassioned pages...brawling their way to greatness on the screen!",
        Release_date: "Aug/28/1953",
        Country_of_origin: ['United States'],
        Director: ['Fred Zinnemann'],
        Writer: ['Daniel Taradash', 'James Jones'],
        Stars: ['Burt Lancaster', 'Montgomery Clift', 'Deborah Kerr'],
        Release_year: 1953.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0120815/",
        Name: "Saving Private Ryan",
        Rating: 8.6,
        Genres: ['Drama', 'War'],
        Poster: "https://m.media-amazon.com/images/M/MV5BZjhkMDM4MWItZTVjOC00ZDRhLThmYTAtM2I5NzBmNmNlMzI1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg",
        Storyline: "Opening with the Allied invasion of Normandy on 6 June 1944, members of the 2nd Ranger Battalion under Cpt. Miller fight ashore to secure a beachhead. Amidst the fighting, two brothers are killed in action. Earlier in New Guinea, a third brother is KIA. Their mother, Mrs. Ryan, is to receive all three of the grave telegrams on the same day. The United States Army Chief of Staff, George C. Marshall, is given an opportunity to alleviate some of her grief when he learns of a fourth brother, Private James Ryan, and decides to send out 8 men (Cpt. Miller and select members from 2nd Rangers) to find him and bring him back home to his mother... —J.Zelman",
        Tagline: "TaglinesIn the Last Great Invasion of the Last Great War, The Greatest Danger for Eight Men was Saving... One.",
        Release_date: "Jul/24/1998",
        Country_of_origin: ['United States'],
        Director: ['Steven Spielberg'],
        Writer: ['Robert Rodat'],
        Stars: ['Tom Hanks', 'Matt Damon', 'Tom Sizemore'],
        Release_year: 1998.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0105695/",
        Name: "Unforgiven",
        Rating: 8.2,
        Genres: ['Drama', 'Western'],
        Poster: "https://m.media-amazon.com/images/M/MV5BODM3YWY4NmQtN2Y3Ni00OTg0LWFhZGQtZWE3ZWY4MTJlOWU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        Storyline: "After escaping death by the skin of her teeth, the horribly disfigured prostitute, Delilah Fitzgerald, and her appalled and equally furious co-workers summon up the courage to seek retribution in 1880s Wyoming's dangerous town of Big Whiskey. With a hefty bounty on the perpetrators' heads, triggered by the tough Sheriff 'Little Bill' Daggett's insufficient sense of justice, the infamous former outlaw and now destitute Kansas hog farmer, William Munny, embarks on a murderous last mission to find the men behind the hideous crime. Along with his old partner-in-crime, Ned Logan, and the brash but inexperienced young gunman, the 'Schofield Kid', Munny enters a perilous world he has renounced many years ago, knowing that he walks right into a deadly trap; however, he still needs to find a way to raise his motherless children. Now, blood demands blood. Who is the hero, and who is the villain? —Nick Riganas",
        Tagline: "TaglinesIt's a hell of a thing, killing a man",
        Release_date: "Aug/07/1992",
        Country_of_origin: ['United States'],
        Director: ['Clint Eastwood'],
        Writer: ['David Webb Peoples'],
        Stars: ['Clint Eastwood', 'Gene Hackman', 'Morgan Freeman'],
        Release_year: 1992.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0082971/",
        Name: "Indiana Jones and the Raiders of the Lost Ark",
        Rating: 8.4,
        Genres: ['Action', 'Adventure'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMjA0ODEzMTc1Nl5BMl5BanBnXkFtZTcwODM2MjAxNA@@._V1_.jpg",
        Storyline: "The year is 1936. An archeology professor named Indiana Jones is venturing in the jungles of South America searching for a golden statue. Unfortunately, he sets off a deadly trap but miraculously escapes. Then, Jones hears from a museum curator named Marcus Brody about a biblical artifact called The Ark of the Covenant, which can hold the key to human existence. Jones has to venture to vast places such as Nepal and Egypt to find this artifact. However, he will have to fight his enemy Rene Belloq and a band of Nazis in order to reach it. —John Wiggins",
        Tagline: "TaglinesIndiana Jones - the new hero from the creators of JAWS and STAR WARS.",
        Release_date: "Jun/12/1981",
        Country_of_origin: ['United States'],
        Director: ['Steven Spielberg'],
        Writer: ['Lawrence Kasdan', 'George Lucas', 'Philip Kaufman'],
        Stars: ['Harrison Ford', 'Karen Allen', 'Paul Freeman'],
        Release_year: 1981.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0075148/",
        Name: "Rocky",
        Rating: 8.1,
        Genres: ['Drama', 'Sport'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNTBkMjg2MjYtYTZjOS00ODQ0LTg0MDEtM2FiNmJmOGU1NGEwXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
        Storyline: "Rocky Balboa is a struggling boxer trying to make the big time, working as a debt collector for a pittance. When heavyweight champion Apollo Creed visits Philadelphia, his managers want to set up an exhibition match between Creed and a struggling boxer, touting the fight as a chance for a 'nobody' to become a 'somebody'. The match is supposed to be easily won by Creed, but someone forgot to tell Rocky, who sees this as his only shot at the big time. —Murray Chapman <muzzle@cs.uq.oz.au>",
        Tagline: "TaglinesYou have a ringside seat for the bloodiest bicentennial in history!",
        Release_date: "Dec/03/1976",
        Country_of_origin: ['United States'],
        Director: ['John G. Avildsen'],
        Writer: ['Sylvester Stallone'],
        Stars: ['Sylvester Stallone', 'Talia Shire', 'Burt Young'],
        Release_year: 1976.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0044081/",
        Name: "A Streetcar Named Desire",
        Rating: 8.0,
        Genres: ['Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNzk2M2Y3MzYtNGMzMi00Y2FjLTkwODQtNmExYWU3ZWY3NzExXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
        Storyline: "Blanche DuBois, a high school English teacher with an aristocratic background from Auriol, Mississippi, decides to move to live with her sister and brother-in-law, Stella and Stanley Kowalski, in New Orleans after creditors take over the family property, Belle Reve. Blanche has also decided to take a break from teaching as she states the situation has frayed her nerves. Knowing nothing about Stanley or the Kowalskis' lives, Blanche is shocked to find that they live in a cramped and run down ground floor apartment - which she proceeds to beautify by putting shades over the open light bulbs to soften the lighting - and that Stanley is not the gentleman that she is used to in men. As such, Blanche and Stanley have an antagonistic relationship from the start. Blanche finds that Stanley's hyper-masculinity, which often displays itself in physical outbursts, is common, coarse and vulgar, being common which in turn is what attracted Stella to him. Beyond finding Blanche's delicate hoidy-toidy act as putting on airs, Stanley, a plant worker, believes she may really have sold Belle Reve and is withholding Stella's fair share of the proceeds from them. What further affects the relationship between the three is that Stella is in the early stage of pregnancy with her and Stanley's first child. Soon after her arrival at the Kowalskis, Blanche starts to date Mitch, one of Stanley's friends and coworkers who is a little softer around the edges than most of Stanley's friends. Mitch does not hide the fact that he is looking in general to get married because of a personal issue, he wanting Blanche ultimately to be his wife. Mitch is somewhat unaware that Blanche has somewhat controlled their courtship to put herself in the best possible light, both figuratively and literally. But in Stanley's quest to find out the truth about Belle Reve and Blanche's life in Auriol, the interrelationships between Stanley, Blanche, Stella and Mitch may be irrevocably affected, with any revelation about that life which may further destroy what's left of Blanche's already damaged mental state. —Huggo",
        Tagline: "Taglines...When she got there she met the brute Stan, and the side of New Orleans she hardly knew existed.",
        Release_date: "Sep/19/1951",
        Country_of_origin: ['United States'],
        Director: ['Elia Kazan'],
        Writer: ['Tennessee Williams', 'Oscar Saul'],
        Stars: ['Vivien Leigh', 'Marlon Brando', 'Kim Hunter'],
        Release_year: 1951.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0032904/",
        Name: "The Philadelphia Story",
        Rating: 7.9,
        Genres: ['Comedy', 'Romance'],
        Poster: "https://m.media-amazon.com/images/M/MV5BYjQ4ZDA4NGMtMTkwYi00NThiLThhZDUtZTEzNTAxOWYyY2E4XkEyXkFqcGdeQXVyMjUxODE0MDY@._V1_.jpg",
        Storyline: "Philadelphia socialites Tracy Lord and C.K. Dexter Haven married impulsively, with their marriage and subsequent divorce being equally passionate. They broke up when Dexter's drinking became excessive, it a mechanism to cope with Tracy's unforgiving manner to the imperfect, imperfections which Dexter admits he readily has. Two years after their break-up, Tracy is about to remarry, the ceremony to take place at the Lord mansion. Tracy's bridegroom is nouveau riche businessman and aspiring politician George Kittredge, who is otherwise a rather ordinary man and who idolizes Tracy. The day before the wedding, three unexpected guests show up at the Lord mansion: Macaulay Connor (Mike to his friends), Elizabeth Imbrie - the two who are friends of Tracy's absent brother, Junius- and Dexter himself. Dexter, an employee of the tabloid Spy magazine, made a deal with its publisher and editor Sidney Kidd to get a story on Tracy's wedding - the wedding of the year - in return for Kidd not publishing a salacious story with accompanying photographs of Tracy's father, Seth Lord, with a New York showgirl named Tina Marra. In reality, Mike and Liz are the reporter and photographer respectively for Spy. Mike and Liz don't particularly like this assignment or working for Kidd, but they need to make a living as their chosen other fields as serious writer and painter don't pay the bills. A suspicious Tracy is onto them, the entire truth which Dexter admits to her. Tracy decides to turn the tables on Mike and Liz. However, hours before the wedding, as the more self-assured Dexter and Liz get to work on how to get the Lords out from under Spy's threats, Tracy and Mike, both inebriated, go on a journey of self-discovery with Tracy ultimately coming to her realizations a little faster than Mike. —Huggo",
        Tagline: "TaglinesThe 3-Star Laugh Hit!",
        Release_date: "Jan/17/1941",
        Country_of_origin: ['United States'],
        Director: ['George Cukor'],
        Writer: ['Donald Ogden Stewart', 'Philip Barry', 'Waldo Salt'],
        Stars: ['Cary Grant', 'Katharine Hepburn', 'James Stewart'],
        Release_year: 1941.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0056592/",
        Name: "To Kill a Mockingbird",
        Rating: 8.3,
        Genres: ['Crime', 'Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNmVmYzcwNzMtMWM1NS00MWIyLThlMDEtYzUwZDgzODE1NmE2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "Small-town Alabama, 1932. Atticus Finch (played by Gregory Peck) is a lawyer and a widower. He has two young children, Jem and Scout. Atticus Finch is currently defending Tom Robinson, a black man accused of raping a white woman. Meanwhile, Jem and Scout are intrigued by their neighbours, the Radleys, and the mysterious, seldom-seen Boo Radley in particular. —grantss",
        Tagline: "TaglinesThe most beloved and widely read Pulitzer Prize Winner now comes vividly alive on the screen!",
        Release_date: "Mar/16/1963",
        Country_of_origin: ['United States'],
        Director: ['Robert Mulligan'],
        Writer: ['Harper Lee', 'Horton Foote'],
        Stars: ['Gregory Peck', 'John Megna', 'Frank Overton'],
        Release_year: 1963.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0043278/",
        Name: "An American in Paris",
        Rating: 7.2,
        Genres: ['Drama', 'Musical', 'Romance'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMzFkNGM0YTUtZjY5Ny00NzBkLWE1NTAtYzUxNjUyZmJlODMwL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg",
        Storyline: "Jerry Mulligan, a struggling American painter in Paris, is 'discovered' by an influential heiress with an interest in more than Jerry's art. Jerry in turn falls for Lise, a young French girl already engaged to a cabaret singer. Jerry jokes, sings and dances with his best friend, an acerbic would-be concert pianist, while romantic complications abound. —Scott Renshaw <as.idc@forsythe.stanford.edu>",
        Tagline: "TaglinesWhat a joy! It's M-G-M's Technicolor musical!",
        Release_date: "Nov/11/1951",
        Country_of_origin: ['United States'],
        Director: ['Vincente Minnelli'],
        Writer: ['Alan Jay Lerner'],
        Stars: ['Gene Kelly', 'Leslie Caron', 'Oscar Levant'],
        Release_year: 1951.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0036868/",
        Name: "The Best Years of Our Lives",
        Rating: 8.1,
        Genres: ['Drama', 'Romance', 'War'],
        Poster: "https://m.media-amazon.com/images/M/MV5BY2RmNTRjYzctODI4Ni00MzQyLWEyNTAtNjU0N2JkMTNhNjJkXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        Storyline: "The story concentrates on the social re-adjustment of three World War II servicemen, each from a different station of society. Al Stephenson returns to an influential banking position, but finds it hard to reconcile his loyalties to ex-servicemen with new commercial realities. Fred Derry is an ordinary working man who finds it difficult to hold down a job or pick up the threads of his marriage. Having had both hands burnt off during the war, Homer Parrish is unsure that his fiancée's feelings are still those of love and not those of pity. Each of the veterans faces a crisis upon his arrival, and each crisis is a microcosm of the experiences of many American warriors who found an alien world awaiting them when they came marching home. —alfiehitchie",
        Tagline: "TaglinesTHE SCREEN'S GREATEST LOVE STORY IS THE BEST FILM THIS YEAR FROM HOLLYWOOD!",
        Release_date: "May/29/1947",
        Country_of_origin: ['United States'],
        Director: ['William Wyler'],
        Writer: ['Robert E. Sherwood', 'MacKinlay Kantor'],
        Stars: ['Myrna Loy', 'Dana Andrews', 'Fredric March'],
        Release_year: 1947.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0058385/",
        Name: "My Fair Lady",
        Rating: 7.8,
        Genres: ['Drama', 'Family', 'Musical'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNGM0ZTU3NmItZmRmMy00YWNjLWEzMWItYzg3MzcwZmM5NjdiXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg",
        Storyline: "Pompous phonetics Professor Henry Higgins (Sir Rex Harrison) is so sure of his abilities that he takes it upon himself to transform a Cockney working-class girl into someone who can pass for a cultured member of high society. His subject turns out to be the lovely Eliza Doolittle (Audrey Hepburn), who agrees to speech lessons to improve her job prospects. Higgins and Eliza clash, then form an unlikely bond, one that is threatened by aristocratic suitor Freddy Eynsford-Hill (Jeremy Brett). —Jwelch5742",
        Tagline: "TaglinesThe loverliest motion picture of them all!",
        Release_date: "Dec/25/1964",
        Country_of_origin: ['United States'],
        Director: ['George Cukor'],
        Writer: ['Alan Jay Lerner', 'George Bernard Shaw'],
        Stars: ['Audrey Hepburn', 'Rex Harrison', 'Stanley Holloway'],
        Release_year: 1964.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0066921/",
        Name: "A Clockwork Orange",
        Rating: 8.3,
        Genres: ['Crime', 'Sci-Fi'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMTY3MjM1Mzc4N15BMl5BanBnXkFtZTgwODM0NzAxMDE@._V1_.jpg",
        Storyline: "Protagonist Alex DeLarge is an 'ultraviolent' youth in futuristic Britain. As with all luck, his eventually runs out and he's arrested and convicted of murder. While in prison, Alex learns of an experimental program in which convicts are programmed to detest violence. If he goes through the program, his sentence will be reduced and he will be back on the streets sooner than expected. But Alex's ordeals are far from over once he hits the streets of Britain.. —Nikki Carlyle",
        Tagline: "TaglinesBeing the adventures of a young man ... who couldn't resist pretty girls ... or a bit of the old ultra-violence ... went to jail, was re-conditioned ... and came out a different young man ... or was he ?",
        Release_date: "Feb/02/1972",
        Country_of_origin: ['United Kingdom', 'United States'],
        Director: ['Stanley Kubrick'],
        Writer: ['Stanley Kubrick', 'Anthony Burgess'],
        Stars: ['Malcolm McDowell', 'Patrick Magee', 'Michael Bates'],
        Release_year: 1972.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0059113/",
        Name: "Doctor Zhivago",
        Rating: 8.0,
        Genres: ['Drama', 'Romance', 'War'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNzdmZTk4MTktZmExNi00OWEwLTgxZDctNTE4NWMwNjc1Nzg2XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg",
        Storyline: "During the Russian Revolution, Dr. Yuri Zhivago (Omar Sharif) is a young doctor who has been raised by his aunt and uncle following his father's suicide. Yuri falls in love with beautiful Lara Guishar (Julie Christie), who has been having an affair with her mother's lover, Victor Komarovsky (Rod Steiger), an unscrupulous businessman. Yuri, however, ends up marrying his cousin, Tonya (Geraldine Chaplin). But when he and Lara meet again years later, the spark of love reignites. —Jwelch5742",
        Tagline: "TaglinesThe entertainment event of the year!",
        Release_date: "Dec/31/1965",
        Country_of_origin: ['Italy', 'United Kingdom', 'United States'],
        Director: ['David Lean'],
        Writer: ['Boris Pasternak', 'Robert Bolt'],
        Stars: ['Omar Sharif', 'Julie Christie', 'Geraldine Chaplin'],
        Release_year: 1965.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0049730/",
        Name: "The Searchers",
        Rating: 7.9,
        Genres: ['Adventure', 'Drama', 'Western'],
        Poster: "https://m.media-amazon.com/images/M/MV5BYWQ3YWJiMDEtMDBhNS00YjY1LTkzNmEtY2U4Njg4MjQ3YWE3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "After a long three-year absence, the battle-scarred Confederate veteran of the American Civil War, Ethan Edwards turns up on the remote and dusty Texan homestead of his brother, Aaron. In high hopes of finding peace, instead, the taciturn former soldier will embark on a treacherous five-year odyssey of retribution, when the ruthless Chief Scar's murderous Comanche raiding party massacres his family, burns the ranch to the ground, and abducts his nine-year-old niece, Debbie. Driven by hatred of Indians, Ethan and his young companion, Martin Pawley, ride through the unforgiving desert to track down their lost Debbie; however, is the woman they lost and the prisoner in Scar's teepee still the same woman the searchers seek? —Nick Riganas",
        Tagline: "TaglinesThe story that sweeps from the great Southwest to the Canadian border in VistaVision.",
        Release_date: "May/26/1956",
        Country_of_origin: ['United States'],
        Director: ['John Ford'],
        Writer: ['Frank S. Nugent', 'Alan Le May'],
        Stars: ['John Wayne', 'Jeffrey Hunter', 'Vera Miles'],
        Release_year: 1956.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0073195/",
        Name: "Jaws",
        Rating: 8.1,
        Genres: ['Adventure', 'Thriller'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
        Storyline: "It's a hot summer on Amity Island, a small community whose main business is its beaches. When new Sheriff Martin Brody discovers the remains of a shark attack victim, his first inclination is to close the beaches to swimmers. This doesn't sit well with Mayor Larry Vaughn and several of the local businessmen. Brody backs down to his regret as that weekend a young boy is killed by the predator. The dead boy's mother puts out a bounty on the shark and Amity is soon swamped with amateur hunters and fisherman hoping to cash in on the reward. A local fisherman with much experience hunting sharks, Quint, offers to hunt down the creature for a hefty fee. Soon Quint, Brody and Matt Hooper from the Oceanographic Institute are at sea hunting the Great White shark. As Brody succinctly surmises after their first encounter with the creature, they're going to need a bigger boat. —garykmcd",
        Tagline: "TaglinesAmity Island had everything. Clear skies. Gentle surf. Warm water. People flocked there every summer. It was the perfect feeding ground.",
        Release_date: "Jun/20/1975",
        Country_of_origin: ['United States'],
        Director: ['Steven Spielberg'],
        Writer: ['Peter Benchley', 'Carl Gottlieb'],
        Stars: ['Roy Scheider', 'Robert Shaw', 'Richard Dreyfuss'],
        Release_year: 1975.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0066206/",
        Name: "Patton",
        Rating: 8.0,
        Genres: ['Biography', 'Drama', 'War'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMmNhZmJhMmYtNjlkMC00MjhjLTk1NzMtMTNlMzYzNjZlMjNiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
        Storyline: "'Patton' tells the tale of General George S. Patton, famous tank commander of World War II. The film begins with Patton's career in North Africa and progresses through the invasion of Europe and the fall of the Third Reich. Side plots also speak of Patton's numerous faults such his temper and tendency toward insubordination, faults that would prevent him from becoming the lead American general in the Normandy Invasion as well as to his being relieved as Occupation Commander of Germany. —Anthony Hughes <husnock31@hotmail.com>",
        Tagline: "TaglinesDirect from its sensational reserved seat engagement.",
        Release_date: "Apr/02/1970",
        Country_of_origin: ['United States'],
        Director: ['Franklin J. Schaffner'],
        Writer: ['Francis Ford Coppola', 'Edmund H. North', 'Ladislas Farago'],
        Stars: ['George C. Scott', 'Karl Malden', 'Stephen Young'],
        Release_year: 1970.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0064115/",
        Name: "Butch Cassidy and the Sundance Kid",
        Rating: 8.0,
        Genres: ['Biography', 'Crime', 'Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMTkyMTM2NDk5Nl5BMl5BanBnXkFtZTgwNzY1NzEyMDE@._V1_.jpg",
        Storyline: "Butch and Sundance are the two leaders of the Hole-in-the-Wall Gang. Butch is all ideas, Sundance is all action and skill. The west is becoming civilized, and when Butch and Sundance rob a train once too often, a special posse begins trailing them no matter where they run. Over rocks, through towns, across rivers, the group is always just behind them. When they finally escape through sheer luck, Butch has another idea, 'Let's go to Bolivia'. Based on the exploits of the historical characters. —John Vogel <jlvogel@comcast.net>",
        Tagline: "TaglinesJust for the fun of it!",
        Release_date: "Sep/24/1969",
        Country_of_origin: ['United States', 'Mexico'],
        Director: ['George Roy Hill'],
        Writer: ['William Goldman'],
        Stars: ['Paul Newman', 'Robert Redford', 'Katharine Ross'],
        Release_year: 1969.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0040897/",
        Name: "The Treasure of the Sierra Madre",
        Rating: 8.2,
        Genres: ['Adventure', 'Drama', 'Western'],
        Poster: "https://m.media-amazon.com/images/M/MV5BOTJlZWMxYzEtMjlkMS00ODE0LThlM2ItMDI3NGQ2YjhmMzkxXkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_.jpg",
        Storyline: "Fred C. Dobbs and Bob Curtin, both down on their luck in Tampico, Mexico in 1925, meet up with a grizzled prospector named Howard and decide to join with him in search of gold in the wilds of central Mexico. Through enormous difficulties, they eventually succeed in finding gold, but bandits, the elements, and most especially greed threaten to turn their success into disaster. —Jim Beaver <jumblejim@prodigy.net>",
        Tagline: "TaglinesStorming to a New High in High Adventure !",
        Release_date: "Jan/24/1948",
        Country_of_origin: ['United States'],
        Director: ['John Huston'],
        Writer: ['John Huston', 'B. Traven'],
        Stars: ['Humphrey Bogart', 'Walter Huston', 'Tim Holt'],
        Release_year: 1948.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0060196/",
        Name: "The Good, the Bad and the Ugly",
        Rating: 8.8,
        Genres: ['Adventure', 'Western'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNjJlYmNkZGItM2NhYy00MjlmLTk5NmQtNjg1NmM2ODU4OTMwXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
        Storyline: "Blondie, The Good (Clint Eastwood), is a professional gunslinger who is out trying to earn a few dollars. Angel Eyes, The Bad (Lee Van Cleef), is a hitman who always commits to a task and sees it through--as long as he's paid to do so. And Tuco, The Ugly (Eli Wallach), is a wanted outlaw trying to take care of his own hide. Tuco and Blondie share a partnership making money off of Tuco's bounty, but when Blondie unties the partnership, Tuco tries to hunt down Blondie. When Blondie and Tuco come across a horse carriage loaded with dead bodies, they soon learn from the only survivor, Bill Carson (Antonio Casale), that he and a few other men have buried a stash of gold in a cemetery. Unfortunately, Carson dies and Tuco only finds out the name of the cemetery, while Blondie finds out the name on the grave. Now the two must keep each other alive in order to find the gold. Angel Eyes (who had been looking for Bill Carson) discovers that Tuco and Blondie met with Carson and knows they know where the gold is; now he needs them to lead him to it. Now The Good, the Bad, and the Ugly must all battle it out to get their hands on $200,000.00 worth of gold. —Jeremy Thomson",
        Tagline: "TaglinesThey formed an alliance of hate to steal a fortune in dead man's gold",
        Release_date: "Dec/29/1967",
        Country_of_origin: ['Italy', 'Spain', 'West Germany'],
        Director: ['Sergio Leone'],
        Writer: ['Luciano Vincenzoni', 'Sergio Leone', 'Agenore Incrocci'],
        Stars: ['Clint Eastwood', 'Eli Wallach', 'Lee Van Cleef'],
        Release_year: 1967.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0053604/",
        Name: "The Apartment",
        Rating: 8.3,
        Genres: ['Comedy', 'Drama', 'Romance'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNzkwODFjNzItMmMwNi00MTU5LWE2MzktM2M4ZDczZGM1MmViXkEyXkFqcGdeQXVyNDY2MTk1ODk@._V1_.jpg",
        Storyline: "As of November 1, 1959, mild mannered C.C. Baxter has been working at Consolidated Life, an insurance company, for close to four years, and is one of close to thirty-two thousand employees located in their Manhattan head office. To distinguish himself from all the other lowly cogs in the company in the hopes of moving up the corporate ladder, he often works late, but only because he can't get into his apartment, located off of Central Park West, since he has provided it to a handful of company executives - Mssrs. Dobisch, Kirkeby, Vanderhoff and Eichelberger - on a rotating basis for their extramarital liaisons in return for a good word to the personnel director, Jeff D. Sheldrake. When Baxter is called into Sheldrake's office for the first time, he learns that it isn't just to be promoted as he expects, but also to add married Sheldrake to the list to who he will lend his apartment. Dobisch, Kirkeby, Vanderhoff and Eichelberger are now feeling neglected as Baxter no longer needs their assistance in moving up. —Huggo",
        Tagline: "TaglinesMovie-wise, there has never been anything like 'THE APARTMENT' love-wise, laugh-wise or otherwise-wise!",
        Release_date: "Jun/29/1960",
        Country_of_origin: ['United States'],
        Director: ['Billy Wilder'],
        Writer: ['Billy Wilder', 'I.A.L. Diamond'],
        Stars: ['Jack Lemmon', 'Shirley MacLaine', 'Fred MacMurray'],
        Release_year: 1960.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0091763/",
        Name: "Platoon",
        Rating: 8.1,
        Genres: ['Drama', 'War'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMzRjZjdlMjQtODVkYS00N2YzLWJlYWYtMGVlN2E5MWEwMWQzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
        Storyline: "Chris Taylor is a young, naive American who gives up college and volunteers for combat in Vietnam. Upon arrival, he quickly discovers that his presence is quite nonessential, and is considered insignificant to the other soldiers, as he has not fought for as long as the rest of them and felt the effects of combat. Chris has two non-commissioned officers, the ill-tempered and indestructible Staff Sergeant Robert Barnes and the more pleasant and cooperative Sergeant Elias Grodin. A line is drawn between the two NCOs and a number of men in the platoon when an illegal killing occurs during a village raid. As the war continues, Chris himself draws towards psychological meltdown. And as he struggles for survival, he soon realizes he is fighting two battles, the conflict with the enemy and the conflict between the men within his platoon. —Jeremy Thomson",
        Tagline: "TaglinesThe first casualty of war is innocence.",
        Release_date: "Feb/06/1987",
        Country_of_origin: ['United States', 'United Kingdom'],
        Director: ['Oliver Stone'],
        Writer: ['Oliver Stone'],
        Stars: ['Charlie Sheen', 'Tom Berenger', 'Willem Dafoe'],
        Release_year: 1987.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0044706/",
        Name: "High Noon",
        Rating: 8.0,
        Genres: ['Drama', 'Thriller', 'Western'],
        Poster: "https://m.media-amazon.com/images/M/MV5BOWIzZGUxZmItOThkMS00Y2QxLTg0MTYtMDdhMjRlNTNlYTI3L2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg",
        Storyline: "On the day he gets married and hangs up his badge, Marshal Will Kane is told that a man he sent to prison years before, Frank Miller, is returning on the noon train to exact his revenge. Having initially decided to leave with his new spouse, Will decides he must go back and face Miller. However, when he seeks the help of the townspeople he has protected for so long, they turn their backs on him. It seems Kane may have to face Miller alone, as well as the rest of Miller's gang, who are waiting for him at the station. —Man_With_No_Name_126",
        Tagline: "TaglinesSimple. Powerful. Unforgettable.",
        Release_date: "Jul/30/1952",
        Country_of_origin: ['United States'],
        Director: ['Fred Zinnemann'],
        Writer: ['Carl Foreman', 'John W. Cunningham'],
        Stars: ['Gary Cooper', 'Grace Kelly', 'Thomas Mitchell'],
        Release_year: 1952.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0112573/",
        Name: "Braveheart",
        Rating: 8.4,
        Genres: ['Biography', 'Drama', 'History'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMzkzMmU0YTYtOWM3My00YzBmLWI0YzctOGYyNTkwMWE5MTJkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "William Wallace is a Scottish rebel who leads an uprising against the cruel English ruler Edward the Longshanks, who wishes to inherit the crown of Scotland for himself. When he was a young boy, William Wallace's father and brother, along with many others, lost their lives trying to free Scotland. Once he loses another of his loved ones, William Wallace begins his long quest to make Scotland free once and for all, along with the assistance of Robert the Bruce. —Anonymous",
        Tagline: "TaglinesThe story of a man with a free soul...and with the courage to follow it.",
        Release_date: "May/24/1995",
        Country_of_origin: ['United States'],
        Director: ['Mel Gibson'],
        Writer: ['Randall Wallace'],
        Stars: ['Mel Gibson', 'Sophie Marceau', 'Patrick McGoohan'],
        Release_year: 1995.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0099348/",
        Name: "Dances with Wolves",
        Rating: 8.0,
        Genres: ['Adventure', 'Drama', 'Western'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMTY3OTI5NDczN15BMl5BanBnXkFtZTcwNDA0NDY3Mw@@._V1_.jpg",
        Storyline: "Lt. John Dunbar is dubbed a hero after he accidentally leads Union troops to a victory during the Civil War. He requests a position on the western frontier, but finds it deserted. He soon finds out he is not alone, but meets a wolf he dubs 'Two-socks' and a curious Indian tribe. Dunbar quickly makes friends with the tribe, and discovers a white woman who was raised by the Indians. He gradually earns the respect of these native people, and sheds his white-man's ways. —Greg Bole <bole@life.bio.sunysb.edu>",
        Tagline: "TaglinesInside everyone is a frontier waiting to be discovered.",
        Release_date: "Nov/21/1990",
        Country_of_origin: ['United States', 'United Kingdom'],
        Director: ['Kevin Costner'],
        Writer: ['Michael Blake'],
        Stars: ['Kevin Costner', 'Mary McDonnell', 'Graham Greene'],
        Release_year: 1990.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0107290/",
        Name: "Jurassic Park",
        Rating: 8.2,
        Genres: ['Action', 'Adventure', 'Sci-Fi'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg",
        Storyline: "Huge advancements in scientific technology have enabled a mogul to create an island full of living dinosaurs. John Hammond has invited four individuals, along with his two grandchildren, to join him at Jurassic Park. But will everything go according to plan? A park employee attempts to steal dinosaur embryos, critical security systems are shut down and it now becomes a race for survival with dinosaurs roaming freely over the island. —Film_Fan",
        Tagline: "TaglinesLife finds a way.",
        Release_date: "Jun/11/1993",
        Country_of_origin: ['United States'],
        Director: ['Steven Spielberg'],
        Writer: ['Michael Crichton', 'David Koepp'],
        Stars: ['Sam Neill', 'Laura Dern', 'Jeff Goldblum'],
        Release_year: 1993.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0070047/",
        Name: "The Exorcist",
        Rating: 8.1,
        Genres: ['Horror'],
        Poster: "https://m.media-amazon.com/images/M/MV5BYWFlZGY2NDktY2ZjOS00ZWNkLTg0ZDAtZDY4MTM1ODU4ZjljXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
        Storyline: "A visiting actress in Washington, D.C., notices dramatic and dangerous changes in the behavior and physical make-up of her 12-year-old daughter. Meanwhile, a young priest at nearby Georgetown University begins to doubt his faith while dealing with his mother's terminal sickness. And, book-ending the story, a frail, elderly priest recognizes the necessity for a show-down with an old demonic enemy. —Andrew Harmon <aharmon@erols.com>",
        Tagline: "TaglinesThe movie you've been waiting for...without the wait.",
        Release_date: "Dec/26/1973",
        Country_of_origin: ['United States'],
        Director: ['William Friedkin'],
        Writer: ['William Peter Blatty'],
        Stars: ['Ellen Burstyn', 'Max von Sydow', 'Linda Blair'],
        Release_year: 1973.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0253474/",
        Name: "The Pianist",
        Rating: 8.5,
        Genres: ['Biography', 'Drama', 'Music'],
        Poster: "https://m.media-amazon.com/images/M/MV5BOWRiZDIxZjktMTA1NC00MDQ2LWEzMjUtMTliZmY3NjQ3ODJiXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        Storyline: "In this adaptation of the autobiography 'The Pianist: The Extraordinary True Story of One Man's Survival in Warsaw, 1939-1945,' Wladyslaw Szpilman, a Polish Jewish radio station pianist, sees Warsaw change gradually as World War II begins. Szpilman is forced into the Warsaw Ghetto, but is later separated from his family during Operation Reinhard. From this time until the concentration camp prisoners are released, Szpilman hides in various locations among the ruins of Warsaw. —Jwelch5742",
        Tagline: "TaglinesMusic was his passion. Survival was his masterpiece.",
        Release_date: "Mar/28/2003",
        Country_of_origin: ['France', 'Poland', 'Germany', 'United Kingdom'],
        Director: ['Roman Polanski'],
        Writer: ['Ronald Harwood', 'Wladyslaw Szpilman'],
        Stars: ['Adrien Brody', 'Thomas Kretschmann', 'Frank Finlay'],
        Release_year: 2003.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0099685/",
        Name: "Goodfellas",
        Rating: 8.7,
        Genres: ['Biography', 'Crime', 'Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "Henry Hill might be a small time gangster, who may have taken part in a robbery with Jimmy Conway and Tommy De Vito, two other gangsters who might have set their sights a bit higher. His two partners could kill off everyone else involved in the robbery, and slowly start to think about climbing up through the hierarchy of the Mob. Henry, however, might be badly affected by his partners' success, but will he consider stooping low enough to bring about the downfall of Jimmy and Tommy? —Colin Tinto <cst@imdb.com>",
        Tagline: "Taglines'As far back as I can remember, I've always wanted to be a gangster.' -- Henry Hill, Brooklyn, N.Y. 1955.",
        Release_date: "Sep/21/1990",
        Country_of_origin: ['United States'],
        Director: ['Martin Scorsese'],
        Writer: ['Nicholas Pileggi', 'Martin Scorsese'],
        Stars: ['Robert De Niro', 'Ray Liotta', 'Joe Pesci'],
        Release_year: 1990.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0077416/",
        Name: "The Deer Hunter",
        Rating: 8.1,
        Genres: ['Drama', 'War'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNDhmNTA0ZDMtYjhkNS00NzEzLWIzYTItOGNkMTVmYjE2YmI3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "Michael, Steven and Nicky are 3 best friends who enjoy going deer hunting quite often. These men get enlisted to head to Vietnam to fight for their country and celebrate with a farewell party, as well as Steven marrying a pregnant woman named 'Angela.' After the horrors during the war and edge-grabbing games of Russian Roulette that these men are forced to play, Michael returns home and realizes that his deer hunting outings aren't the same as they used to be, because of the war and he eventually finds out that Steven is handicapped and Nicky hasn't returned from Vietnam, and in response, he heads back to Vietnam to rescue him. —Koen Versieck",
        Tagline: "TaglinesOne of the most important and powerful films of all time!",
        Release_date: "Feb/23/1979",
        Country_of_origin: ['United States', 'United Kingdom'],
        Director: ['Michael Cimino'],
        Writer: ['Michael Cimino', 'Deric Washburn', 'Louis Garfinkle'],
        Stars: ['Robert De Niro', 'Christopher Walken', 'John Cazale'],
        Release_year: 1979.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0020629/",
        Name: "All Quiet on the Western Front",
        Rating: 8.1,
        Genres: ['Drama', 'War'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMzg2MWQ4MDEtOGZlNi00MTg0LWIwMjQtYWY5NTQwYmUzMWNmXkEyXkFqcGdeQXVyMzg2MzE2OTE@._V1_.jpg",
        Storyline: "This is an English language film (made in America) adapted from a novel by German author Erich Maria Remarque. The film follows a group of German schoolboys, talked into enlisting at the beginning of World War 1 by their jingoistic teacher. The story is told entirely through the experiences of the young German recruits and highlights the tragedy of war through the eyes of individuals. As the boys witness death and mutilation all around them, any preconceptions about 'the enemy' and the 'rights and wrongs' of the conflict disappear, leaving them angry and bewildered. This is highlighted in the scene where Paul mortally wounds a French soldier and then weeps bitterly as he fights to save his life while trapped in a shell crater with the body. The film is not about heroism but about drudgery and futility and the gulf between the concept of war and the actuality. —Michele Wilkinson, University of Cambridge Language Centre, <mw125@cus.cam.ac.uk>",
        Tagline: "TaglinesAt last....the motion picture!",
        Release_date: "Aug/24/1930",
        Country_of_origin: ['United States'],
        Director: ['Lewis Milestone'],
        Writer: ['Erich Maria Remarque', 'Maxwell Anderson', 'George Abbott'],
        Stars: ['Lew Ayres', 'Louis Wolheim', 'John Wray'],
        Release_year: 1930.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0061418/",
        Name: "Bonnie and Clyde",
        Rating: 7.7,
        Genres: ['Action', 'Biography', 'Crime'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMTNjNzBlY2QtNmY1Ni00MzhkLThmODgtMzc3ZDQ0YzJjZjNlXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
        Storyline: "1934. Young adults Bonnie Parker, a waitress, and Clyde Barrow, a criminal just released from prison, are immediately attracted to what the other represents for their life when they meet by chance in West Dallas, Texas. Bonnie is fascinated with Clyde's criminal past, and his matter-of-factness and bravado in talking about it. Clyde sees in Bonnie someone sympathetic to his goals. Although attracted to each other physically, a sexual relationship between the two has obstacles. They decide to join forces to embark on a life of crime, holding up whatever establishments, primarily banks, to make money and to have fun. They don't plan on hurting anyone or killing despite wielding loaded guns. They amass a small gang of willing accomplices, including C.W. Moss, a mechanic to fix whatever cars they steal which is important especially for their getaways, and Buck Barrow, one of Clyde's older brothers. The only reluctant tag-along is Buck's nervous wife, Blanche Barrow, a preacher's daughter. The gang's life changes after the first fatal shot is fired. After that, their willingness to shoot to kill increases to protect themselves and their livelihood. Their notoriety precedes them, so much so that no matter what one's opinion is of them, most want to have some association to the Barrow gang, to help them, to be spoken in the same breath as them, or to capture and or kill them. Of the many people they encounter in their crime spree, the one who may have the most profound effect on their lives is Texas Ranger, Frank Hamer, who seeks retribution. —Huggo",
        Tagline: "Taglines'The strangest damned gang you ever heard of. They're young. They're in love. They rob banks.'",
        Release_date: "Aug/14/1967",
        Country_of_origin: ['United States'],
        Director: ['Arthur Penn'],
        Writer: ['David Newman', 'Robert Benton', 'Robert Towne'],
        Stars: ['Warren Beatty', 'Faye Dunaway', 'Michael J. Pollard'],
        Release_year: 1967.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0067116/",
        Name: "The French Connection",
        Rating: 7.7,
        Genres: ['Action', 'Crime', 'Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BOTZhY2E3NmItMGIwNi00OTA2LThkYmEtODFiZTM0NGI0ZWU5XkEyXkFqcGdeQXVyNTc1NTQxODI@._V1_.jpg",
        Storyline: "William Friedkin's gritty police drama portrays two tough New York City cops trying to intercept a huge heroin shipment coming from France. An interesting contrast is established between 'Popeye' Doyle, a short-tempered alcoholic bigot who is nevertheless a hard-working and dedicated police officer, and his nemesis Alain Charnier, a suave and urbane gentleman who is nevertheless a criminal and one of the largest drug suppliers of pure heroin to North America. During the surveillance and eventual bust, Friedkin provides one of the most gripping and memorable car chase sequences ever filmed. —Tad Dibbern <DIBBERN_D@a1.mscf.upenn.edu>",
        Tagline: "TaglinesThe time is just right for an out and out thriller like this.",
        Release_date: "Oct/09/1971",
        Country_of_origin: ['United States'],
        Director: ['William Friedkin'],
        Writer: ['Ernest Tidyman', 'Robin Moore'],
        Stars: ['Gene Hackman', 'Roy Scheider', 'Fernando Rey'],
        Release_year: 1971.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0021749/",
        Name: "City Lights",
        Rating: 8.5,
        Genres: ['Comedy', 'Drama', 'Romance'],
        Poster: "https://m.media-amazon.com/images/M/MV5BY2I4MmM1N2EtM2YzOS00OWUzLTkzYzctNDc5NDg2N2IyODJmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "A tramp falls in love with a beautiful blind girl. Her family is in financial trouble. The tramp's on-and-off friendship with a wealthy man allows him to be the girl's benefactor and suitor. —John J. Magee <magee@helix.mgh.harvard.edu>",
        Tagline: "TaglinesHE RETURNS -And the world rocks again with laughter. (Print Ad-Daily Examiner, ((Grafton, NSW)) 6 July 1931)",
        Release_date: "Mar/07/1931",
        Country_of_origin: ['United States'],
        Director: ['Charles Chaplin'],
        Writer: ['Charles Chaplin', 'Harry Carr', 'Harry Crocker'],
        Stars: ['Charles Chaplin', 'Virginia Cherrill', 'Florence Lee'],
        Release_year: 1931.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0025316/",
        Name: "It Happened One Night",
        Rating: 8.1,
        Genres: ['Comedy', 'Romance'],
        Poster: "https://m.media-amazon.com/images/M/MV5BYzJmMWE5NjAtNWMyZS00NmFiLWIwMDgtZDE2NzczYWFhNzIzXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg",
        Storyline: "Ellie Andrews has just tied the knot with society aviator King Westley when she is whisked away to her father's yacht and out of King's clutches. Ellie jumps ship and eventually winds up on a bus headed back to her husband. Reluctantly she must accept the help of out-of- work reporter Peter Warne. Actually, Warne doesn't give her any choice: either she sticks with him until he gets her back to her husband, or he'll blow the whistle on Ellie to her father. Either way, Peter gets what (he thinks!) he wants .... a really juicy newspaper story. —A.L.Beneteau <albl@inforamp.net>",
        Tagline: "TaglinesTwo great lovers of the screen in the grandest of romantic comedies !",
        Release_date: "Feb/22/1934",
        Country_of_origin: ['United States'],
        Director: ['Frank Capra'],
        Writer: ['Robert Riskin', 'Samuel Hopkins Adams'],
        Stars: ['Clark Gable', 'Claudette Colbert', 'Walter Connolly'],
        Release_year: 1934.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0043924/",
        Name: "A Place in the Sun",
        Rating: 7.7,
        Genres: ['Drama', 'Romance'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMmNjMjE2ZDMtODQzYS00ZDc2LTk0ODgtNjI1NTNhZWI5MmE0XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_.jpg",
        Storyline: "A chance meeting with his uncle leads to George Eastman (Montgomery Clift) being caught in the middle of two worlds, neither side in which he truly belongs. The son of poor missionaries, his father who has passed away, George met his wealthy paternal uncle Charles Eastman (Herbert Heyes) while George was working as a bellhop in his uncle's hotel in Chicago, Illinois. Wanting a better life for himself, George takes his uncle up on his offer for a placement somewhere in one of the Eastman factories, Charles' want in this offer being for any Eastman to take his proper place in the world. Under the directive of his cousin Earl (Keefe Brasselle), George is placed on the factory assembly line, largely neglected by the Eastmans as a whole. Regardless, George still does see this position as a stepping stone to something better, for which he is willing to work hard to achieve. George, lonely in his new surroundings, breaks the company rule of no fraternizing with fellow employees when he starts to date fellow Eastman assembly line worker Alice Tripp (Shelley Winters). Several months later, Charles, remembering about his nephew, promotes George both professionally and personally. Although uncomfortable in society gatherings, George eventually is befriended by one person in this new world, the beautiful society maiden Angela Vickers (Dame Elizabeth Taylor), who George fell in love with at first sight even before he arrived in town. Angela too falls in love with George, which does not sit well with her parents if only because they know nothing of him. George is caught between his want for prosperity and being with Angela, the woman he truly loves, and his obligations to needy Alice, who learns of his society friends and Angela, who ends up getting pregnant by him, and who uses whatever means in her limited powers to pressure him to do right by her in marrying her. —Huggo",
        Tagline: "TaglinesLove that paid the severest of all penalties!",
        Release_date: "Nov/09/1951",
        Country_of_origin: ['United States'],
        Director: ['George Stevens'],
        Writer: ['Theodore Dreiser', 'Patrick Kearney', 'Michael Wilson'],
        Stars: ['Montgomery Clift', 'Elizabeth Taylor', 'Shelley Winters'],
        Release_year: 1951.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0064665/",
        Name: "Midnight Cowboy",
        Rating: 7.8,
        Genres: ['Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNTgwZmIzMmYtZjE3Yy00NzgzLTgxNmUtNjlmZDlkMzlhOTJkXkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_.jpg",
        Storyline: "Texas greenhorn Joe Buck arrives in New York City for the first time. Preening himself as a real 'hustler', he finds that he is the one getting 'hustled' until he teams up with down-and-out but resilient outcast Ratso Rizzo. The initial 'country cousin meets city cousin' relationship deepens. In their efforts to bilk a hostile world rebuffing them at every turn, this unlikely pair progress from partners in shady business to comrades. Each has found his first real friend. —alfiehitchie",
        Tagline: "TaglinesWhatever you hear about Midnight Cowboy is true.",
        Release_date: "May/25/1969",
        Country_of_origin: ['United States'],
        Director: ['John Schlesinger'],
        Writer: ['Waldo Salt', 'James Leo Herlihy'],
        Stars: ['Dustin Hoffman', 'Jon Voight', 'Sylvia Miles'],
        Release_year: 1969.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0031679/",
        Name: "Mr. Smith Goes to Washington",
        Rating: 8.1,
        Genres: ['Comedy', 'Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BZTYwYjYxYzgtMDE1Ni00NzU4LWJlMTEtODQ5YmJmMGJhZjI5L2ltYWdlXkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_.jpg",
        Storyline: "Naive and idealistic Jefferson Smith, leader of the Boy Rangers, is appointed on a lark by the spineless governor of his state. He is reunited with the state's senior senator--presidential hopeful and childhood hero, Senator Joseph Paine. In Washington, however, Smith discovers many of the shortcomings of the political process as his earnest goal of a national boys' camp leads to a conflict with the state political boss, Jim Taylor. Taylor first tries to corrupt Smith and then later attempts to destroy Smith through a scandal. —James Yu <jamestyu@ccwf.cc.utexas.edu>",
        Tagline: "TaglinesOUR OPERATOR SAYS..'IT'S GOING TO BE A PLEASURE TO RUN 'MR. SMITH GOES TO WASHINGTON' 5 DAYS STARTING SUNDAY, NOV.7) (print ad - Lubbock Morning Avalanche - Cactus Theatre - Lubbock Texas - November 2, 1938 - all caps)",
        Release_date: "Oct/19/1939",
        Country_of_origin: ['United States'],
        Director: ['Frank Capra'],
        Writer: ['Sidney Buchman', 'Lewis R. Foster', 'Myles Connolly'],
        Stars: ['James Stewart', 'Jean Arthur', 'Claude Rains'],
        Release_year: 1939.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0095953/",
        Name: "Rain Man",
        Rating: 8.0,
        Genres: ['Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMzVjNzI4NzYtMjE4NS00M2IzLWFkOWMtOTYwMWUzN2ZlNGVjL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
        Storyline: "Charles Sanford 'Charlie' Babbit is a self-centered Los Angeles-based automobile dealer/hustler/bookie who is at war with his own life. Charlie, as a young teenager, used his father's 1949 Buick convertible without permission and as a result, he went to jail for two days on account that his father reported it stolen. It is then that Charlie learns that his estranged father died and left him from his last will and testament a huge bed of roses and the car while the remainder will of $3 Million goes into a trust fund to be distributed to someone. Charlie seemed pretty angry by this and decides to look into this matter. It seems as if that 'someone' is Raymond, Charlie's unknown brother, an autistic savant who lives in a world of his own, resides at the Walbrook Institute. Charlie then kidnaps Raymond and decides to take him on a lust for life trip to the west coast as a threat to get the $3 Million inheritance. Raymond's acts and nagging, including repeated talks of 'Abbott & Costello', 'Four minutes till Wapner' and refusal to fly on an airline except Qantas drives Charlie insane... and out of his selfish world into a cross-country trek of pure love and understanding that these two both have. —Christopher Howell (Ckhowell75360@aol.com)",
        Tagline: "TaglinesA journey through understanding and fellowship.",
        Release_date: "Dec/16/1988",
        Country_of_origin: ['United States'],
        Director: ['Barry Levinson'],
        Writer: ['Barry Morrow', 'Ronald Bass'],
        Stars: ['Dustin Hoffman', 'Tom Cruise', 'Valeria Golino'],
        Release_year: 1988.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0075686/",
        Name: "Annie Hall",
        Rating: 8.0,
        Genres: ['Comedy', 'Romance'],
        Poster: "https://m.media-amazon.com/images/M/MV5BZDg1OGQ4YzgtM2Y2NS00NjA3LWFjYTctMDRlMDI3NWE1OTUyXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
        Storyline: "Alvy Singer, a forty year old twice divorced, neurotic, intellectual Jewish New York City stand-up comic, reflects on the demise of his latest relationship, to Annie Hall, an insecure, flighty, Midwestern WASP aspiring nightclub singer. Unlike his previous relationships, Alvy believed he may have worked out all the issues in his life through fifteen years of therapy to make this relationship with Annie last, among those issues being not wanting to date any woman that would want to date him, and thus subconsciously pushing those women away. Alvy not only reviews the many ups and many downs of their relationship, but also reviews the many facets of his makeup that led to him starting to date Annie. Those facets include growing up next to Coney Island in Brooklyn, being attracted to the opposite sex for as long as he can remember, and enduring years of Jewish guilt with his constantly arguing parents. —Huggo",
        Tagline: "TaglinesA nervous romance.",
        Release_date: "Apr/20/1977",
        Country_of_origin: ['United States'],
        Director: ['Woody Allen'],
        Writer: ['Woody Allen', 'Marshall Brickman'],
        Stars: ['Woody Allen', 'Diane Keaton', 'Tony Roberts'],
        Release_year: 1977.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0116282/",
        Name: "Fargo",
        Rating: 8.1,
        Genres: ['Crime', 'Thriller'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNDJiZDgyZjctYmRjMS00ZjdkLTkwMTEtNGU1NDg3NDQ0Yzk1XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "Jerry works in his father-in-law's car dealership and has gotten himself in financial problems. He tries various schemes to come up with money needed for a reason that is never really explained. It has to be assumed that his huge embezzlement of money from the dealership is about to be discovered by father-in-law. When all else falls through, plans he set in motion earlier for two men to kidnap his wife for ransom to be paid by her wealthy father (who doesn't seem to have the time of day for son-in-law). From the moment of the kidnapping, things go wrong and what was supposed to be a non-violent affair turns bloody with more blood added by the minute. Jerry is upset at the bloodshed, which turns loose a pregnant sheriff from Brainerd, MN who is tenacious in attempting to solve the three murders in her jurisdiction. —Anonymous",
        Tagline: "TaglinesA homespun murder story.",
        Release_date: "Apr/05/1996",
        Country_of_origin: ['United States', 'United Kingdom'],
        Director: ['Joel Coen', 'Ethan Coen'],
        Writer: ['Ethan Coen', 'Joel Coen'],
        Stars: ['William H. Macy', 'Frances McDormand', 'Steve Buscemi'],
        Release_year: 1996.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0049261/",
        Name: "Giant",
        Rating: 7.6,
        Genres: ['Drama', 'Western'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMDQwOWQ0OGItNjJjYi00YzVjLTk4NmUtYzQ0NzUwZGY3NDZjXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
        Storyline: "Texan rancher Jordan 'Bick' Benedict, Jr. (Rock Hudson) visits a Maryland farm to buy a prize horse. While there he meets and falls in love with the owner's daughter Leslie (Dame Elizabeth Taylor), they are married immediately and return to his ranch. The story of their family and its rivalry with cowboy and (later oil tycoon) Jett Rink (James Dean) unfolds across two generations. —Col Needham <col@imdb.com>",
        Tagline: "TaglinesFrom the novel by EDNA FERBER",
        Release_date: "Nov/24/1956",
        Country_of_origin: ['United States'],
        Director: ['George Stevens'],
        Writer: ['Edna Ferber', 'Fred Guiol', 'Ivan Moffat'],
        Stars: ['Elizabeth Taylor', 'Rock Hudson', 'James Dean'],
        Release_year: 1956.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0046303/",
        Name: "Shane",
        Rating: 7.6,
        Genres: ['Drama', 'Western'],
        Poster: "https://m.media-amazon.com/images/M/MV5BYzMzZmJjZGItMjY2OC00ZDcxLWI1YjQtMTU1MjQwN2NlNzIyXkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_.jpg",
        Storyline: "Shane rides into a conflict between cattleman Ryker and a bunch of settlers, like Joe Starrett and his family, whose land Ryker wants. When Shane beats up Ryker's man Chris, Ryker tries to buy him. Then Shane and Joe take on the whole Ryker crew. Ryker sends to Cheyenne for truly evil gunslinger Wilson. Shane must clear out all the guns from the valley. —Ed Stephan <stephan@cc.wwu.edu>",
        Tagline: "TaglinesThe Greatest Story Of the West Ever Filmed [re-release]",
        Release_date: "Aug/14/1953",
        Country_of_origin: ['United States'],
        Director: ['George Stevens'],
        Writer: ['A.B. Guthrie Jr.', 'Jack Sher', 'Jack Schaefer'],
        Stars: ['Alan Ladd', 'Jean Arthur', 'Van Heflin'],
        Release_year: 1953.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0032551/",
        Name: "The Grapes of Wrath",
        Rating: 8.1,
        Genres: ['Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNzJiOGI2MjctYjUyMS00ZjkzLWE2ZmUtOTg4NTZkOTNhZDc1L2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg",
        Storyline: "The Joad clan, introduced to the world in John Steinbeck's iconic novel, is looking for a better life in California. After their drought-ridden farm is seized by the bank, the family -- led by just-paroled son Tom -- loads up a truck and heads West. On the road, beset by hardships, the Joads meet dozens of other families making the same trek and holding onto the same dream. Once in California, however, the Joads soon realize that the promised land isn't quite what they hoped. —Jwelch5742",
        Tagline: "TaglinesThe thousands who have read the book will know why WE WILL NOT SELL ANY CHILDREN TICKETS to see this picture!",
        Release_date: "Mar/15/1940",
        Country_of_origin: ['United States'],
        Director: ['John Ford'],
        Writer: ['Nunnally Johnson', 'John Steinbeck'],
        Stars: ['Henry Fonda', 'Jane Darwell', 'John Carradine'],
        Release_year: 1940.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0120689/",
        Name: "The Green Mile",
        Rating: 8.6,
        Genres: ['Crime', 'Drama', 'Fantasy'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_.jpg",
        Storyline: "Death Row guards at a penitentiary, in the 1930's, have a moral dilemma with their job when they discover one of their prisoners, a convicted murderer, has a special gift. —Guy Johns",
        Tagline: "TaglinesMiracles do happen.",
        Release_date: "Dec/10/1999",
        Country_of_origin: ['United States'],
        Director: ['Frank Darabont'],
        Writer: ['Stephen King', 'Frank Darabont'],
        Stars: ['Tom Hanks', 'Michael Clarke Duncan', 'David Morse'],
        Release_year: 1999.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0075860/",
        Name: "Close Encounters of the Third Kind",
        Rating: 7.6,
        Genres: ['Drama', 'Sci-Fi'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMjM1NjE5NjQxN15BMl5BanBnXkFtZTgwMjYzMzQxMDE@._V1_.jpg",
        Storyline: "Two parallel stories are told. In the first, a group of research scientists from a variety of backgrounds are investigating the strange appearance of items in remote locations, primarily desert regions. In continuing their investigation, one of the lead scientists, a Frenchman named Claude Lacombe, incorporates the Kodály method of music education as a means of communication in their work. The response, in turn, at first baffles the researchers, until American cartographer David Laughlin deciphers the meaning of the response. In the second, electric company lineman and family man Roy Neary and single mother Jillian Guiler are among some individuals in Muncie, Indiana who experience some paranormal activity before some flashes of bright lights in the sky, which they believe to be a UFO. Roy becomes obsessed with what he saw, unlike some others, especially in some form of authority, who refuse to acknowledge their belief that it was a UFO in not wanting to appear crazy. That obsession both for Roy and Jillian is ratcheted up a notch when they begin to have a vision of a mound with vertical striations on its side as a key to what is going on. While the obsession negatively affects Roy's life as he knows it in its entirety, Jillian knows she has to find the answer as to its meaning, especially as it relates to her only child, three year old Barry Guiler, who may be more attuned to what is happening than the adult figures around him. These two stories have the potential to intersect if Roy and Jillian can discover where they've seen that mound before, and if they can overcome what they believe to be the lies perpetrated by those in authority in covering up what is going on. —Huggo",
        Tagline: "TaglinesClose Encounter of the First Kind - Sighting of a UFO. Close Encounter of the Second Kind - Physical Evidence. Close Encounter of the Third Kind - Contact. WE ARE NOT ALONE",
        Release_date: "Dec/14/1977",
        Country_of_origin: ['United States', 'United Kingdom'],
        Director: ['Steven Spielberg'],
        Writer: ['Steven Spielberg', 'Hal Barwood', 'Jerry Belson'],
        Stars: ['Richard Dreyfuss', 'François Truffaut', 'Teri Garr'],
        Release_year: 1977.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0073440/",
        Name: "Nashville",
        Rating: 7.7,
        Genres: ['Comedy', 'Drama', 'Music'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMDY0MzE3YWQtZTAzMS00ZmRlLWE3NzYtMjk0NDlkMmE4N2U2XkEyXkFqcGdeQXVyMTAwMzUyOTc@._V1_.jpg",
        Storyline: "Five days in the Nashville country and gospel music scene, filled with stars, wannabe stars, and other hangers-on - individual stories of this small group intertwined - provides a commentary on American society. The stars include: good ol' boy Haven Hamilton, whose patriotic songs leading up to the American bicentennial belie his controlling and ruthless nature; Barbara Jean, the country music darling who is just returning to Nashville and performing following recovery from a fire-related injury which may have taken more of an emotional toll than a physical one; and good looking and charismatic Tom Frank, one-third of the successful group Bill, Mary, and Tom, he who is trying to go solo, which masks his need to not be solo in his personal life as he emotionally abuses woman after woman in love with him, including Mary who is married to Bill. The wannabe stars include: Albuquerque, whose real name is Winifred, who is trying to run away from her husband Star in he not approving of her career choice; and Sueleen Gay, a waitress who will do anything to make it big in music despite being told directly that she has no singing talent. Tying their stories together are: Opal, a supposed reporter for the BBC who is working on a documentary and is searching for whatever angle she can; John Triplette, a Yankee in town to organize political fundraisers, including a country music outdoor concert, for third party (the Replacement Party) presidential candidate, populist Hal Phillip Walker, who has the potential to take just enough votes to affect the election; and Martha, who has renamed herself L.A. Jones, who is in town to visit her hospitalized ailing aunt, but who instead decides to be a groupie to any country music star she can find. —Huggo",
        Tagline: "TaglinesWild. Wonderful. Sinful. Laughing. Explosive.",
        Release_date: "Jul/01/1975",
        Country_of_origin: ['United States'],
        Director: ['Robert Altman'],
        Writer: ['Joan Tewkesbury'],
        Stars: ['Keith Carradine', 'Karen Black', 'Ronee Blakley'],
        Release_year: 1975.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0074958/",
        Name: "Network",
        Rating: 8.1,
        Genres: ['Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BZGNjYjM2MzItZGQzZi00NmY3LTgxOGUtMTQ2MWQxNWQ2MmMwXkEyXkFqcGdeQXVyNzM0MTUwNTY@._V1_.jpg",
        Storyline: "In the 1970s, terrorist violence is the stuff of networks' nightly news programming and the corporate structure of the UBS Television Network is changing. Meanwhile, Howard Beale, the aging UBS news anchor, has lost his once strong ratings share and so the network fires him. Beale reacts in an unexpected way. We then see how this affects the fortunes of Beale, his coworkers (Max Schumacher and Diana Christensen), and the network. —Bruce Janson <bruce@cs.su.oz.au>",
        Tagline: "Taglines'NETWORK'... the humanoids, the love story, the trials and tribulations, the savior of television, the attempted suicides, the assassination -- it's ALL coming along with a galaxy of stars you know and love!",
        Release_date: "Nov/27/1976",
        Country_of_origin: ['United States'],
        Director: ['Sidney Lumet'],
        Writer: ['Paddy Chayefsky'],
        Stars: ['Faye Dunaway', 'William Holden', 'Peter Finch'],
        Release_year: 1976.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0061722/",
        Name: "The Graduate",
        Rating: 8.0,
        Genres: ['Comedy', 'Drama', 'Romance'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMTQ0ODc4MDk4Nl5BMl5BanBnXkFtZTcwMTEzNzgzNA@@._V1_.jpg",
        Storyline: "Benjamin Braddock returns home to California after successfully completing college. He gets a hero's welcome from his parents but Ben isn't quite sure what to do with the rest of his life. He is soon seduced by Mrs. Robinson, the wife of his father's partner, who methodically pursues the inexperienced young man. Soon, they are meeting regularly in hotel rooms. Warned by her to stay away from her daughter Elaine, his father goads him into taking her out on a date. He finds he quite likes Elaine but when she learns he's been having an affair with her own mother, she'll have nothing to do with him. He's smitten however and pursues her. —garykmcd",
        Tagline: "TaglinesThe Movie That Became A Legend [Video Australia]",
        Release_date: "Dec/21/1967",
        Country_of_origin: ['United States'],
        Director: ['Mike Nichols'],
        Writer: ['Calder Willingham', 'Buck Henry', 'Charles Webb'],
        Stars: ['Dustin Hoffman', 'Anne Bancroft', 'Katharine Ross'],
        Release_year: 1967.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0069704/",
        Name: "American Graffiti",
        Rating: 7.4,
        Genres: ['Comedy', 'Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMjI5NjM5MjIyNF5BMl5BanBnXkFtZTgwNjg2MTUxMDE@._V1_.jpg",
        Storyline: "It's the proverbial end of the summer 1962 in a small southern California town. It's the evening before best friends and recent high school graduates, Curt Henderson and Steve Bolander, are scheduled to leave town to head to college back east. Curt, who received a lucrative local scholarship, is seen as the promise that their class holds. But Curt is having second thoughts about leaving what Steve basically sees as their dead end town. Curt's beliefs are strengthened when he spots an unknown beautiful blonde in a T-bird who mouths the words 'I love you' to him. As Curt tries to find that blonde while trying to get away from a local gang who have him somewhat hostage, Curt may come to a decision about his immediate future. Outgoing class president Steve, on the other hand, wants to leave, despite meaning that he will leave girlfriend, head cheerleader and Curt's sister, Laurie Henderson, behind. Steve and Laurie spend the evening 'negotiating' the state of their relationship. Meanwhile, two of their friends cruise around town for the evening. Steve has left his car to meek and mild-mannered Terry 'Toad' Fields to look after during his absence. The wheels give Toad a new sense of confidence, which he uses to try and impress Debbie Dunham, a more experienced girl generally out of his league. And John Milner, who is seen as the king of the street race in his souped-up yellow deuce coupe, tries to get rid of precocious pre-teen, Carol Morrison, who has somehow become his passenger for the evening, while dealing with the challenge of bold out-of-towner, Bob Falfa. —Huggo",
        Tagline: "Taglines...is back! [1978 Re-release]",
        Release_date: "Aug/11/1973",
        Country_of_origin: ['United States'],
        Director: ['George Lucas'],
        Writer: ['George Lucas', 'Gloria Katz', 'Willard Huyck'],
        Stars: ['Richard Dreyfuss', 'Ron Howard', 'Paul Le Mat'],
        Release_year: 1973.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0110912/",
        Name: "Pulp Fiction",
        Rating: 8.9,
        Genres: ['Crime', 'Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents. —Soumitra",
        Tagline: "TaglinesGirls like me don't make invitations like this to just anyone!",
        Release_date: "Oct/14/1994",
        Country_of_origin: ['United States'],
        Director: ['Quentin Tarantino'],
        Writer: ['Quentin Tarantino', 'Roger Avary'],
        Stars: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
        Release_year: 1994.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0086425/",
        Name: "Terms of Endearment",
        Rating: 7.4,
        Genres: ['Comedy', 'Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMTk0ODM4NDk0MF5BMl5BanBnXkFtZTgwMTEzMDUxMDE@._V1_.jpg",
        Storyline: "Aurora and Emma are mother and daughter who march to different drummers. Beginning with Emma's marriage, Aurora shows how difficult and loving she can be. The movie covers several years of their lives as each finds different reasons to go on living and find joy. Aurora's interludes with Garrett Breedlove, retired astronaut and next door neighbor are quite striking. In the end, different people show their love in very different ways. —John Vogel <jlvogel@comcast.net>",
        Tagline: "TaglinesCome to Laugh, Come to Cry, Come to Care, Come to Terms.",
        Release_date: "Dec/09/1983",
        Country_of_origin: ['United States'],
        Director: ['James L. Brooks'],
        Writer: ['Larry McMurtry', 'James L. Brooks'],
        Stars: ['Shirley MacLaine', 'Debra Winger', 'Jack Nicholson'],
        Release_year: 1983.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0119217/",
        Name: "Good Will Hunting",
        Rating: 8.3,
        Genres: ['Drama', 'Romance'],
        Poster: "https://m.media-amazon.com/images/M/MV5BOTI0MzcxMTYtZDVkMy00NjY1LTgyMTYtZmUxN2M3NmQ2NWJhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
        Storyline: "A touching tale of a wayward young man who struggles to find his identity, living in a world where he can solve any problem, except the one brewing deep within himself, until one day he meets his soul mate who opens his mind and his heart. —Dima & Danielle",
        Tagline: "TaglinesSome people can never believe in themselves, until someone believes in them.",
        Release_date: "Jan/09/1998",
        Country_of_origin: ['United States'],
        Director: ['Gus Van Sant'],
        Writer: ['Matt Damon', 'Ben Affleck'],
        Stars: ['Robin Williams', 'Matt Damon', 'Ben Affleck'],
        Release_year: 1998.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0043265/",
        Name: "The African Queen",
        Rating: 7.7,
        Genres: ['Adventure', 'Drama', 'Romance'],
        Poster: "https://m.media-amazon.com/images/M/MV5BYzM3YjE2NGMtODY3Zi00NTY0LWE4Y2EtMTE5YzNmM2U1NTg2XkEyXkFqcGdeQXVyMTY5Nzc4MDY@._V1_.jpg",
        Storyline: "September 1914, news reaches the colony German Eastern Africa that Germany is at war, so Reverend Samuel Sayer became a hostile foreigner. German imperial troops burn down his mission; he is beaten and dies of fever. His well-educated, snobbish sister Rose Sayer buries him and leaves by the only available transport, the dilapidated river steamboat 'African Queen' of grumpy Charlie Allnut. As if a long difficult journey without any comfort weren't bad enough for such odd companions, she is determined to find a way to do their bit for the British war effort (and avenge her brother) and aims high, as God is obviously on their side: construct their own equipment, a torpedo and the converted steamboat, to take out a huge German warship, the Louisa, which is hard to find on the giant lake and first of all to reach, in fact as daunting an expedition as anyone attempted since the late adventurous explorer John Speakes, but she presses till Charlie accepts to steam up the Ulana, about to brave a German fort, raging rapids, very bloodthirsty parasites and the endlessly branching stream which seems to go nowhere but impenetrable swamps... Despite fierce rows and moral antagonism between a bossy devout abstentionist and a free-spirited libertine drunk loner, the two grow closer to each-other as their quest drags on... —KGF Vissers",
        Tagline: "TaglinesBogart the King is back with the 'Queen!'",
        Release_date: "Mar/21/1952",
        Country_of_origin: ['United Kingdom', 'United States'],
        Director: ['John Huston'],
        Writer: ['C.S. Forester', 'James Agee', 'John Huston'],
        Stars: ['Humphrey Bogart', 'Katharine Hepburn', 'Robert Morley'],
        Release_year: 1952.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0031971/",
        Name: "Stagecoach",
        Rating: 7.8,
        Genres: ['Adventure', 'Drama', 'Western'],
        Poster: "https://m.media-amazon.com/images/M/MV5BOGQ4NDUyNWQtZTEyOC00OTMzLWFhYjAtNDNmYmQ2MWQyMTRmXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
        Storyline: "A simple stagecoach trip is complicated by the fact that Geronimo is on the warpath in the area. The passengers on the coach include a drunken doctor, two women, a bank manager who has taken off with his client's money, and the famous Ringo Kid, among others. —Andrew Hyatt <dres@uiuc.edu>",
        Tagline: "TaglinesDanger holds the reins as the devil cracks the whip ! Desperate men ! Frontier women ! Rising above their pasts in a West corrupted by violence and gun-fire !",
        Release_date: "Mar/03/1939",
        Country_of_origin: ['United States'],
        Director: ['John Ford'],
        Writer: ['Ernest Haycox', 'Dudley Nichols', 'Ben Hecht'],
        Stars: ['John Wayne', 'Claire Trevor', 'Andy Devine'],
        Release_year: 1939.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0026752/",
        Name: "Mutiny on the Bounty",
        Rating: 7.7,
        Genres: ['Adventure', 'Biography', 'Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNmRhZWU4MTAtNzE0OC00YjIyLTk2MGItMDRjYTc0MTZiNmU1XkEyXkFqcGdeQXVyMTY5Nzc4MDY@._V1_.jpg",
        Storyline: "Midshipman Roger Byam joins Captain Bligh and Fletcher Christian aboard HMS Bounty for a voyage to Tahiti. Bligh proves to be a brutal tyrant and, after six pleasant months on Tahiti, Christian leads the crew to mutiny on the homeward voyage. Even though Byam takes no part in the mutiny, he must defend himself against charges that he supported Christian. —Eric Sorensen <Eric_Sorensen@fc.mcps.k12.md.us>",
        Tagline: "TaglinesPulsating, exotic romance, turbulent drama, mighty spectacle- in M-G-M's magnificent $2,000,000 screen triumph! (Print Ad-Arcadia Daily Tribune, ((Arcadia, Calif.)) 6 February 1936)",
        Release_date: "Jan/12/1936",
        Country_of_origin: ['United States'],
        Director: ['Frank Lloyd'],
        Writer: ['Talbot Jennings', 'Jules Furthman', 'Carey Wilson'],
        Stars: ['Charles Laughton', 'Clark Gable', 'Franchot Tone'],
        Release_year: 1936.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0032553/",
        Name: "The Great Dictator",
        Rating: 8.4,
        Genres: ['Comedy', 'Drama', 'War'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMmExYWJjNTktNGUyZS00ODhmLTkxYzAtNWIzOGEyMGNiMmUwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        Storyline: "20 years after the end of WWI, in which the nation of Tomainia was on the losing side, Adenoid Hynkel has risen to power as the ruthless dictator of the country. He believes in a pure Aryan state and the decimation of the Jews. This situation is unknown to a simple Jewish Tomainian barber who has been hospitalized since a WWI battle. Upon his release the barber, who had been suffering from memory loss about the war, is shown the new persecuted life of the Jews by many living in the Jewish ghetto, including a washerwoman named Hannah with whom he begins a relationship. The barber is ultimately spared such persecution by Commander Schultz, whom he saved in that WWI battle. The lives of all Jews in Tomainia are eventually spared with a policy shift by Hynkel himself, who is doing so for ulterior motives. But those motives include a desire for world domination, starting with the invasion of neighboring Osterlich, which may be threatened by Benzino Napaloni, the dictator of neighboring Bacteria. Ultimately Schultz, who has turned traitor against Hynkel's regime, and the barber may be able to join forces to take control of the situation, using Schultz's inside knowledge of the regime's workings and the barber's uncanny resemblance to one of those in power. —Huggo",
        Tagline: "TaglinesThe Comedy Masterpiece!",
        Release_date: "Mar/07/1941",
        Country_of_origin: ['United States'],
        Director: ['Charles Chaplin'],
        Writer: ['Charles Chaplin'],
        Stars: ['Charles Chaplin', 'Paulette Goddard', 'Jack Oakie'],
        Release_year: 1941.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0036775/",
        Name: "Double Indemnity",
        Rating: 8.3,
        Genres: ['Crime', 'Drama', 'Film-Noir'],
        Poster: "https://m.media-amazon.com/images/M/MV5BOTdlNjgyZGUtOTczYi00MDdhLTljZmMtYTEwZmRiOWFkYjRhXkEyXkFqcGdeQXVyNDY2MTk1ODk@._V1_.jpg",
        Storyline: "In 1938, Walter Neff, an experienced salesman of the Pacific All Risk Insurance Co., meets the seductive wife of one of his clients, Phyllis Dietrichson, and they have an affair. Phyllis proposes to kill her husband to receive the proceeds of an accident insurance policy and Walter devises a scheme to receive twice the amount based on a double indemnity clause. When Mr. Dietrichson is found dead on a train track, the police accept the determination of accidental death. However, the insurance analyst and Walter's best friend Barton Keyes does not buy the story and suspects that Phyllis has murdered her husband with the help of another man. —Claudio Carvalho, Rio de Janeiro, Brazil",
        Tagline: "TaglinesIT'S LOVE AND MURDER AT FIRST SIGHT! (print ad - Lubbock Morning Avalanche - Lindsey Theatre - Lubbock, Texas - September 1, 1944 - all caps)",
        Release_date: "Jul/06/1944",
        Country_of_origin: ['United States'],
        Director: ['Billy Wilder'],
        Writer: ['Billy Wilder', 'Raymond Chandler', 'James M. Cain'],
        Stars: ['Fred MacMurray', 'Barbara Stanwyck', 'Edward G. Robinson'],
        Release_year: 1944.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0033870/",
        Name: "The Maltese Falcon",
        Rating: 8.0,
        Genres: ['Crime', 'Film-Noir', 'Mystery'],
        Poster: "https://m.media-amazon.com/images/M/MV5BZjIwNGM1ZTUtOThjYS00NDdiLTk2ZDYtNGY5YjJkNzliM2JjL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMDI2NDg0NQ@@._V1_.jpg",
        Storyline: "Spade and Archer is the name of a San Francisco detective agency. That's for Sam Spade and Miles Archer. The two men are partners, but Sam doesn't like Miles much. A knockout, who goes by the name of Miss Wonderly, walks into their office; and by that night everything's changed. Miles is dead. And so is a man named Floyd Thursby. It seems Miss Wonderly is surrounded by dangerous men. There's Joel Cairo, who uses gardenia-scented calling cards. There's Kasper Gutman, with his enormous girth and feigned civility. Her only hope of protection comes from Sam, who is suspected by the police of one or the other murder. More murders are yet to come, and it will all be because of these dangerous men -- and their lust for a statuette of a bird: the Maltese Falcon. —J. Spurlin",
        Tagline: "TaglinesIt's thrilling . . . it's chilling . . . it's the most baffling mystery story in years !",
        Release_date: "Oct/18/1941",
        Country_of_origin: ['United States'],
        Director: ['John Huston'],
        Writer: ['John Huston', 'Dashiell Hammett'],
        Stars: ['Humphrey Bogart', 'Mary Astor', 'Gladys George'],
        Release_year: 1941.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0032145/",
        Name: "Wuthering Heights",
        Rating: 7.5,
        Genres: ['Drama', 'Romance'],
        Poster: "https://m.media-amazon.com/images/M/MV5BMDAxZDkzNTktYzQyMi00YmRlLWFmYWQtY2Q4ZTQyMGFlMzNmL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg",
        Storyline: "The story of unfortunate lovers Cathy (Merle Oberon) and Heathcliff (Sir Laurence Olivier) who, despite a deep affection for one another, are forced by circumstance and prejudice to live their lives apart. Heathcliff and Cathy first meet as children when her father, Mr. Earnshaw (Cecil Kellaway) brings the abandoned boy to live with them. When the old man dies several years later, Cathy's brother, Hindley (Hugh Williams), now the master of the estate, turns Heathcliff out, forcing him to live with the servants and working as a stable boy. The barrier of class comes between them, and she eventually marries a rich neighbor, Edgar Linton (David Niven), at which point, Heathcliff disappears. He returns several years later, now a rich man, but little can be done. —garykmcd",
        Tagline: "TaglinesA Story of Vengeful Thwarted Love",
        Release_date: "Apr/07/1939",
        Country_of_origin: ['United States'],
        Director: ['William Wyler'],
        Writer: ['Charles MacArthur', 'Ben Hecht', 'Emily Brontë'],
        Stars: ['Merle Oberon', 'Laurence Olivier', 'David Niven'],
        Release_year: 1939.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0075314/",
        Name: "Taxi Driver",
        Rating: 8.3,
        Genres: ['Crime', 'Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BM2M1MmVhNDgtNmI0YS00ZDNmLTkyNjctNTJiYTQ2N2NmYzc2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "Travis Bickle is an ex-Marine and Vietnam War veteran living in New York City. As he suffers from insomnia, he spends his time working as a taxi driver at night, watching porn movies at seedy cinemas during the day, or thinking about how the world, New York in particular, has deteriorated into a cesspool. He's a loner who has strong opinions about what is right and wrong with mankind. For him, the one bright spot in New York humanity is Betsy, a worker on the presidential nomination campaign of Senator Charles Palantine. He becomes obsessed with her. After an incident with her, he believes he has to do whatever he needs to make the world a better place in his opinion. One of his priorities is to be the savior for Iris, a twelve-year-old runaway and prostitute who he believes wants out of the profession and under the thumb of her pimp and lover Matthew. —Huggo",
        Tagline: "TaglinesOn every street in every city in this country, there's a nobody who dreams of being a somebody.",
        Release_date: "Feb/09/1976",
        Country_of_origin: ['United States'],
        Director: ['Martin Scorsese'],
        Writer: ['Paul Schrader'],
        Stars: ['Robert De Niro', 'Jodie Foster', 'Cybill Shepherd'],
        Release_year: 1976.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0047396/",
        Name: "Rear Window",
        Rating: 8.5,
        Genres: ['Mystery', 'Thriller'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNGUxYWM3M2MtMGM3Mi00ZmRiLWE0NGQtZjE5ODI2OTJhNTU0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
        Storyline: "Professional photographer L.B. 'Jeff' Jefferies breaks his leg while getting an action shot at an auto race. Confined to his New York apartment, he spends his time looking out of the rear window observing the neighbors. He begins to suspect that a man across the courtyard may have murdered his wife. Jeff enlists the help of his high society fashion-consultant girlfriend Lisa Fremont and his visiting nurse Stella to investigate. —Col Needham <col@imdb.com>",
        Tagline: "TaglinesThe Essential Hitchcock",
        Release_date: "Sep/01/1954",
        Country_of_origin: ['United States'],
        Director: ['Alfred Hitchcock'],
        Writer: ['John Michael Hayes', 'Cornell Woolrich'],
        Stars: ['James Stewart', 'Grace Kelly', 'Wendell Corey'],
        Release_year: 1954.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0041959/",
        Name: "The Third Man",
        Rating: 8.1,
        Genres: ['Film-Noir', 'Mystery', 'Thriller'],
        Poster: "https://m.media-amazon.com/images/M/MV5BYjE2OTdhMWUtOGJlMy00ZDViLWIzZjgtYjZkZGZmMDZjYmEyXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        Storyline: "An out of work pulp fiction novelist, Holly Martins, arrives in a post war Vienna divided into sectors by the victorious allies, and where a shortage of supplies has led to a flourishing black market. He arrives at the invitation of an ex-school friend, Harry Lime, who has offered him a job, only to discover that Lime has recently died in a peculiar traffic accident. From talking to Lime's friends and associates Martins soon notices that some of the stories are inconsistent, and determines to discover what really happened to Harry Lime. —Mark Thompson <mrt@oasis.icl.co.uk>",
        Tagline: "TaglinesCarol Reed's Classic Thriller",
        Release_date: "Sep/03/1949",
        Country_of_origin: ['United Kingdom'],
        Director: ['Carol Reed'],
        Writer: ['Graham Greene', 'Orson Welles', 'Alexander Korda'],
        Stars: ['Orson Welles', 'Joseph Cotten', 'Alida Valli'],
        Release_year: 1949.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0048545/",
        Name: "Rebel Without a Cause",
        Rating: 7.7,
        Genres: ['Drama'],
        Poster: "https://m.media-amazon.com/images/M/MV5BYzk2ZDU3MmMtMDBmMi00YWIyLTkxM2YtZjg3MzgyOTAzZjg0XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
        Storyline: "Jim Stark is the new kid in town. He has been in trouble elsewhere; that's why his family has had to move before. Here he hopes to find the love he doesn't get from his middle-class family. Though he finds some of this in his relation with Judy, and a form of it in both Plato's adulation and Ray's real concern for him, Jim must still prove himself to his peers in switchblade knife fights and 'chickie' games in which cars race toward a seaside cliff. —Ed Stephan <stephan@cc.wwu.edu>",
        Tagline: "TaglinesJames Dean in his sensational role. (Australian daybill)",
        Release_date: "Oct/29/1955",
        Country_of_origin: ['United States'],
        Director: ['Nicholas Ray'],
        Writer: ['Stewart Stern', 'Irving Shulman', 'Nicholas Ray'],
        Stars: ['James Dean', 'Natalie Wood', 'Sal Mineo'],
        Release_year: 1955.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0053125/",
        Name: "North by Northwest",
        Rating: 8.3,
        Genres: ['Adventure', 'Mystery', 'Thriller'],
        Poster: "https://m.media-amazon.com/images/M/MV5BZDA3NDExMTUtMDlhOC00MmQ5LWExZGUtYmI1NGVlZWI4OWNiXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg",
        Storyline: "Madison Avenue advertising man Roger Thornhill finds himself thrust into the world of spies when he is mistaken for a man by the name of George Kaplan. Foreign spy Philip Vandamm and his henchman Leonard try to eliminate him but when Thornhill tries to make sense of the case, he is framed for murder. Now on the run from the police, he manages to board the 20th Century Limited bound for Chicago where he meets a beautiful blond, Eve Kendall, who helps him to evade the authorities. His world is turned upside down yet again when he learns that Eve isn't the innocent bystander he thought she was. Not all is as it seems however, leading to a dramatic rescue and escape at the top of Mt. Rushmore. —garykmcd",
        Tagline: "TaglinesAlfred Hitchcock takes you.... North by Northwest!",
        Release_date: "Dec/18/1959",
        Country_of_origin: ['United States'],
        Director: ['Alfred Hitchcock'],
        Writer: ['Ernest Lehman'],
        Stars: ['Cary Grant', 'Eva Marie Saint', 'James Mason'],
        Release_year: 1959.0,
    },
    {
        Web: "https://www.imdb.com/title/tt0035575/",
        Name: "Yankee Doodle Dandy",
        Rating: 7.6,
        Genres: ['Biography', 'Drama', 'Family'],
        Poster: "https://m.media-amazon.com/images/M/MV5BNDQ2MWJjNjUtYmVlNS00YjUzLWFkMDEtYzE2MjkxOTljMmI1XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg",
        Storyline: "A musical portrait of composer/singer/dancer George M. Cohan. From his early days as a child-star in his family's vaudeville show up to the time of his comeback at which he received a medal from the president for his special contributions to the US, this is the life- story of George M. Cohan, who produced, directed, wrote and starred in his own musical shows for which he composed his famous songs. —Leon Wolters <wolters@strw.LeidenUniv.nl>",
        Tagline: "TaglinesBased on the story of GEORGE M. COHAN with the Greatest of all his Great Music",
        Release_date: "Jun/06/1942",
        Country_of_origin: ['United States'],
        Director: ['Michael Curtiz'],
        Writer: ['Robert Buckner', 'Edmund Joseph', 'Julius J. Epstein'],
        Stars: ['James Cagney', 'Joan Leslie', 'Walter Huston'],
        Release_year: 1942.0,
    },

];