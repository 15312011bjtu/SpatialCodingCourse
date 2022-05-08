
let day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const RandomDay = Math.floor(Math.random() * day.length);

let time1 = ['morning', 'noon', 'night'];
const RandomTime1 = Math.floor(Math.random() * time1.length);

let animal = ['dog', 'cat', 'fox', 'giraffe', 'zebra'];
const RandomAnimal = Math.floor(Math.random() * animal.length);

let colors = ['red', 'yellow', 'purple', 'blue', 'pink'];
const RandomColor = Math.floor(Math.random() * colors.length);

let places = ['ocean', 'sky', 'islet'];
const RandomPlaces = Math.floor(Math.random() * places.length);



document.write(`${RandomDay, day[RandomDay]}  ${RandomTime1, time1[RandomTime1]}, a ${RandomAnimal, animal[RandomAnimal]} gave me a ${RandomColor, colors[RandomColor]}  flower from ${RandomPlaces, places[RandomPlaces]} .`)




