
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");
const whiteBg = document.querySelector(".white-bg");
const liMenu = document.querySelector(".li-menu");
const lisMenu = document.querySelectorAll('.li-menu');


hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active");
    nav.classList.toggle("is-open");
    whiteBg.classList.toggle("is-open");
    console.log(whiteBg);
    for (var i = 0; i < lisMenu.length; i++) {
        lisMenu[i].classList.toggle("is-open");
    }
})

//メインスライド
var slider = new Swiper ('.gallery-slider', {
    effect: "fade",
    
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    loopedSlides: 5, //スライドの枚数と同じ値を指定
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

//サムネイルスライド
var thumbs = new Swiper ('.gallery-thumbs', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
});

//3系
//slider.params.control = thumbs;
//thumbs.params.control = slider;

//4系～
slider.controller.control = thumbs;
thumbs.controller.control = slider;