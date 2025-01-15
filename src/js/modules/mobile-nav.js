function mobileNav() {
	// Mobile nav button
	const navBtnOpen = document.querySelector('#mobile-nav-btn');
	const nav = document.querySelector('.mobile-nav');
	const navBtnClose = document.querySelector('#close-mobile-nav');
	const mobileNavFade = document.querySelector('.mobile-nav-fade');


	navBtnOpen.onclick = function () {
		nav.classList.add('mobile-nav--open');
		mobileNavFade.classList.add('mobile-nav-fade--open');
		document.body.classList.toggle('no-scroll');
	};

	navBtnClose.onclick = function () {
		nav.classList.remove('mobile-nav--open');
		mobileNavFade.classList.remove('mobile-nav-fade--open');
		document.body.classList.toggle('no-scroll');
	};

	nav.addEventListener('click', function (e) {
		e.stopPropagation();
	});

	mobileNavFade.onclick = function () {
		nav.classList.remove('mobile-nav--open');
		mobileNavFade.classList.remove('mobile-nav-fade--open');
		document.body.classList.toggle('no-scroll');
	};

}

export default mobileNav;