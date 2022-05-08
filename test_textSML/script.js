let FontSizeButton = document.querySelectorAll('.FontSizeButton');

let textbody = document.getElementById('testfontsizetext');

//alert('javascript works')


function largefont() {
	textbody.classList.remove('mediumfont');
	textbody.classList.remove('smallfont');
	textbody.classList.add('largefont');
}
function mediumfont() {
	textbody.classList.remove('largefont');
	textbody.classList.remove('smallfont');
	textbody.classList.add('mediumfont');
}
function smallfont() {
	textbody.classList.remove('largefont');
	textbody.classList.remove('mediumfont');
	textbody.classList.add('smallfont');
}


FontSizeButton[0].addEventListener('click', largefont)
FontSizeButton[1].addEventListener('click', mediumfont)
FontSizeButton[2].addEventListener('click', smallfont)
