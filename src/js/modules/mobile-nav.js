function mobileNav() {
	// Mobile nav button
	const navBtn = document.querySelector('#mobile-nav-btn');
	const nav = document.querySelector('.mobile-nav');


	navBtn.onclick = function () {
		nav.classList.toggle('mobile-nav--open');
		document.body.classList.toggle('no-scroll');
	};
}

export default mobileNav;