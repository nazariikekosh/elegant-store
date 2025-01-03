import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiper = new Swiper('.swiper', {
  loop: false,
  slidesPerView: 'auto',
  spaceBetween: 12,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },
  breakpoints: {
    840: {
      spaceBetween: 24
    }
  }
});

export default swiper;