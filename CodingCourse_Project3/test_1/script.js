const searchBar = document.querySelector("input");

function printit(e) {
    console.log(e.target.value)
}

searchBar.addEventListener("keyup", printit);

