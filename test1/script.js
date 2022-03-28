/* 

Create an animation that moves the square across the page when it is clicked.

Step 1. Grab the square

Step 2. Write the function that adds the animation, e.g. function moveRight(){};

Step 3. Write the event listener and handler

*/

let square = document.querySelector(".square");

function moveRight() {
    square.classList.add("run-animation");
}

square.addEventListener("click", moveRight);
