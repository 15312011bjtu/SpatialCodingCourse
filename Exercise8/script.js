/*declare elements, defined as const*/
const change = document.getElementById('Button');

const fly = document.getElementsByTagName('body')[0];

const pink = document.querySelector('.pink');
const white = document.querySelector('.white');
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');

//console.log(change)




function changeColorPink() {
    fly.style.background = 'pink';
}

function changeColorWhite() {
    fly.style.background = 'white';
}

function changeColorBlue() {
    fly.style.background = 'blue';
}

function changeColorRed() {
    fly.style.background = 'red';
}


pink.addEventListener('click', changeColorPink)
white.addEventListener('click', changeColorWhite)
blue.addEventListener('click', changeColorBlue)
red.addEventListener('click', changeColorRed)