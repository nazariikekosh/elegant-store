function mobileNav() {
	// Mobile nav button
	const navBtnOpen = document.querySelector('#mobile-nav-btn');
	const nav = document.querySelector('.mobile-nav');
	const navBtnClose = document.querySelector('#close-mobile-nav');
	const mobileNavFade = document.querySelector('.mobile-nav-fade');
	const mobileNavLinks = document.querySelectorAll('.mobile-nav__link'); // Всі посилання в мобільному меню

	// Відкриття меню
	navBtnOpen.onclick = function () {
		nav.classList.add('mobile-nav--open');
		mobileNavFade.classList.add('mobile-nav-fade--open');
		document.body.classList.add('no-scroll');
	};

	// Закриття меню через кнопку
	navBtnClose.onclick = function () {
		closeMobileNav();
	};

	// Закриття меню через натискання на fade
	mobileNavFade.onclick = function () {
		closeMobileNav();
	};

	// Закриття меню при кліку на посилання
	mobileNavLinks.forEach((link) => {
		link.onclick = function () {
			closeMobileNav();
		};
	});

	// Функція для закриття мобільного меню
	function closeMobileNav() {
		nav.classList.remove('mobile-nav--open');
		mobileNavFade.classList.remove('mobile-nav-fade--open');
		document.body.classList.remove('no-scroll');
	}
}

export default mobileNav;
