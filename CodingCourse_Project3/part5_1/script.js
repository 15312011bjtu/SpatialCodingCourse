









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




const poster = document.querySelector(".main_poster");

const searchBar = document.querySelector("input");
const list_container = document.querySelector(".movielist_container");

function search_movie(e) {
    if (e.keyCode === 13) /*keyCode===13， "Enter" button*/ {
        const searchString = e.target.value;
        //console.log("line 48: ", searchString[0].Name)
        console.log('name = ', searchString)
        const searchedName = movie_dataset.filter(function (movies) {
            if (searchString) {
                return movies.Name.toLowerCase().includes(searchString.toLowerCase());
            }
        });
        displaySearched(searchedName);
    }
}


function displaySearched(searchedName) {
    console.log("displaySearched : ", searchedName[0].Name);
    clearList();
    for (let i = 0; i < searchedName.length; i++) {
        let list_item = document.createElement("li");
        list_item.textContent = searchedName[i].Name;//现在还只有name
        list_container.appendChild(list_item);
    }

}


function clearList() {
    console.log("clear this list first");
    list_container.innerHTML = "";
}

searchBar.addEventListener("keyup", search_movie);