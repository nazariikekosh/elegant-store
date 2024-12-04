import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiper = new Swiper('.swiper', {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 24,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});

import tagline from './modules/tagline.js';
tagline();


