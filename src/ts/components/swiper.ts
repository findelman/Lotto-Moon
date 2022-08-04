  import Swiper, { Navigation } from 'swiper';
  import 'swiper/css';
//   import 'swiper/css/navigation';

export  const swiper = new Swiper('.swiper', {
    modules: [Navigation],
    loop: true,  
    spaceBetween: 1,
    slidesPerView: 3,
    centeredSlides: true,
    roundLengths: true,
    loopAdditionalSlides: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },  
  })

