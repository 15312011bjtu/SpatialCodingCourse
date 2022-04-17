// copy for
function displayRelated(SearchedMovie) /*input SearchedMovie, a list of related movie_dataset*/ {
    //clearList();
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