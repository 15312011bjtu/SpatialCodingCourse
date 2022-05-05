/*declare elements, defined as const*/
const change = document.getElementById('Button');
const body = document.querySelector("body");

const pink = document.querySelector('.pink');
const white = document.querySelector('.white');
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');

//console.log(change)

theme_list = ['pink-theme', 'white-theme', 'red-theme','blue-theme']


function changeColorPink() {
    for (let i = 0; i < theme_list.length; i++) {
        body.classList.remove(theme_list[i]);
    }
    body.classList.add('pink-theme');
}

function changeColorWhite() {
    for (let i = 0; i < theme_list.length; i++) {
        body.classList.remove(theme_list[i]);
    }    
    body.classList.add('white-theme');
}

function changeColorBlue() {
    for (let i = 0; i < theme_list.length; i++) {
        body.classList.remove(theme_list[i]);
    }
    body.classList.add('blue-theme');
}

function changeColorRed() {
    for (let i = 0; i < theme_list.length; i++) {
        body.classList.remove(theme_list[i]);
    }
    body.classList.add('red-theme');
}


pink.addEventListener('click', changeColorPink)
white.addEventListener('click', changeColorWhite)
blue.addEventListener('click', changeColorBlue)
red.addEventListener('click', changeColorRed)