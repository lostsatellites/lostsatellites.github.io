const main = document.querySelector('.main');
const sections = document.querySelectorAll('.section');
const closeBtns = document.querySelectorAll('.close-section');

function openSection() {
	main.classList.add('section-has-transition', 'section-is-open');
	this.classList.add('open');
	let animating = true;
}

function closeSection(e) {
	e.stopPropagation();
	main.classList.remove('section-is-open');
	sections.classList.remove('open');
}

function toggleActive(e) {
  console.log(e.propertyName);
}


sections.forEach(section => section.addEventListener('click', openSection));
sections.forEach(section => section.addEventListener('transitionend', toggleActive));
closeBtns.forEach(btn => btn.addEventListener('click', closeSection));
