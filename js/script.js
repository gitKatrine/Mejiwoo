//Табы
const tabs = document.querySelectorAll('.tab');
const tabsContent = document.querySelectorAll('.products__tab-content');
tabs.forEach(item => item.addEventListener('click', event => {
   const tabsTarget = event.target.getAttribute('tab-data');
   tabs.forEach(elem => elem.classList.remove('tab_active'));
   tabsContent.forEach(elem => elem.classList.add('hidden'))
   item.classList.add('tab_active');
   document.getElementById(tabsTarget).classList.remove('hidden')
}));

//Cлайдер
function Slider(setting) {
   let privates = {};
   privates.setting = setting;
   privates.sel = {
      slider: document.querySelector(privates.setting.slider),
      carousel: document.querySelector(privates.setting.carousel),
      carouselItems: document.querySelector(privates.setting.carousel).children,
      prev: document.querySelector(privates.setting.prev),
      next: document.querySelector(privates.setting.next),
      itemsToShow: privates.setting.itemsToShow,
      cardsGap: privates.setting.cardsGap
   };

   privates.opt = {
      numOfItems: privates.sel.carouselItems.length,
      sizeOfItem: (privates.sel.slider.offsetWidth - (privates.sel.itemsToShow - 1) * privates.sel.cardsGap) / privates.sel.itemsToShow,
      pathToMove: (privates.sel.slider.offsetWidth - (privates.sel.itemsToShow - 1) * privates.sel.cardsGap) / privates.sel.itemsToShow + privates.sel.cardsGap,
      currentItem: 1
   };

   this.resizeAll = () => {
      //Высчитываем новый размер элемента слайдера в соответствии с размером окна
      privates.opt.sizeOfItem = (privates.sel.slider.offsetWidth - (privates.sel.itemsToShow - 1) * privates.sel.cardsGap) / privates.sel.itemsToShow;
      privates.opt.pathToMove = privates.opt.sizeOfItem + privates.sel.cardsGap;
      console.log(privates.opt);
      //Задаем размеры элементам и самой карусели
      Object.keys(privates.sel.carouselItems).forEach((key) => privates.sel.carouselItems[key].style.width = privates.opt.sizeOfItem + 'px')
      privates.sel.carousel.style.width = privates.opt.numOfItems * privates.opt.sizeOfItem +
         privates.sel.cardsGap * (privates.opt.numOfItems - 1) + 'px';
   }
   this.prevSlide = () => {
      privates.sel.next.classList.remove('hidden')
      privates.sel.carousel.style.transform = "translateX(" + (-privates.opt.pathToMove * (privates.opt.currentItem - 1) + privates.opt.pathToMove) + "px)";
      privates.opt.currentItem -= 1;
      if (privates.opt.currentItem == 1) privates.sel.prev.classList.add('hidden');
   }
   this.nextSlide = () => {
      privates.sel.prev.classList.remove('hidden')
      privates.sel.carousel.style.transform = "translateX(" + (-privates.opt.pathToMove * privates.opt.currentItem) + "px)";
      privates.opt.currentItem += 1;
      if (privates.opt.currentItem == (privates.opt.numOfItems - privates.sel.itemsToShow + 1)) privates.sel.next.classList.add('hidden');
   }

   //Запускаем слайдер
   this.resizeAll();
   window.addEventListener('resize', this.resizeAll);
   if (privates.opt.numOfItems > privates.sel.itemsToShow) {
      privates.sel.next.classList.remove('hidden');
      privates.sel.next.addEventListener('click', this.nextSlide);
      privates.sel.prev.addEventListener('click', this.prevSlide);
   }
}

bestSellersSlider = new Slider({
   slider: '.best-sellers__slider',
   carousel: '.best-sellers__slider-carousel',
   prev: '.best-sellers__slider-arrow.prev',
   next: '.best-sellers__slider-arrow.next',
   itemsToShow: 3,
   cardsGap: 24
});

reviewsSlider = new Slider({
   slider: '.reviews__slider',
   carousel: '.reviews__slider-carousel',
   prev: '.reviews__slider-arrow.prev',
   next: '.reviews__slider-arrow.next',
   itemsToShow: 3,
   cardsGap: 24
});
//Реализация слайдера

// const slider = document.querySelector('.best-sellers__slider');
// const carousel = document.querySelector('.best-sellers__slider-carousel');
// const sliderCards = document.querySelectorAll('.best-sellers__card');
// const numOfCards = sliderCards.length;
// const btnPrev = document.querySelector('.best-sellers__slider-arrow.prev');
// const btnNext = document.querySelector('.best-sellers__slider-arrow.next');

// //Настраиваемые параметры
// const itemsToShow = 3;
// const cardsGap = 24;

// //Задаем ширину карусели и карточкам в зависимости от заданных параметров
// const sizeOfCard = (slider.offsetWidth - (itemsToShow - 1)*cardsGap)/itemsToShow;
// sliderCards.forEach((card) => card.style.width = sizeOfCard + 'px')
// carousel.style.width = numOfCards*sizeOfCard + cardsGap*(numOfCards - 1) + 'px';

// //Рассчет пути скролла(сама карточка + отступ)
// const pathToMove = sizeOfCard + cardsGap;
// let currentSlide = 1;
// btnNext.addEventListener("click", () => {
//    btnPrev.classList.remove('hidden')
//    carousel.style.transform = "translateX("+(-pathToMove*currentSlide)+"px)";
//    currentSlide += 1;
//    if (currentSlide == (numOfCards - 3)) btnNext.classList.add('hidden');
// });
// btnPrev.addEventListener("click", () => {
//    btnNext.classList.remove('hidden')
//    carousel.style.transform = "translateX("+(-pathToMove*(currentSlide - 1) + pathToMove)+"px)";
//    currentSlide -= 1;
//    if (currentSlide == 1) btnPrev.classList.add('hidden');
// });
