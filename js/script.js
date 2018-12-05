$(document).ready(function() {

  $('.carousel').owlCarousel({
    loop:true,
    margin:5,
    nav:false,
    autoplay: true,
    autoplayTimeout: 8000,
    autoHeight: true,
    responsive:{
      0:{
        items:1
      }
    }
  });

  $('.mask').mask("+375 (99) 999-99-99");

  const faqQuestion = document.querySelectorAll('.faq__item');

  if(faqQuestion) {

    faqQuestion.forEach(function(item) {
      item.addEventListener(`click`, function (event) {
        this.classList.toggle('faq__item--active');
      });
    });

  }

  const minusButton = document.querySelectorAll('.counter__minus');
  const plusButton = document.querySelectorAll('.counter__plus');

  if(minusButton && plusButton) {

    minusButton.forEach(function(item) {
      item.addEventListener(`click`, counter);
    });

    plusButton.forEach(function(item) {
      item.addEventListener(`click`, counter);
    });

  }

  function counter() {

    if(this.classList.contains('counter__minus')) {
      const input = this.parentElement.querySelector('.counter__field');

      if(input.value <= 1) {
        return;
      } else {
        input.value--;
      }

    } else if(this.classList.contains('counter__plus')) {
      const input = this.parentElement.querySelector('.counter__field');
      if(input.value >= 99) {
        return;
      } else {
        input.value++;
      }
    }

  }

  const hamburger = document.querySelector('.menu__hamburger');

  if(hamburger) {
    hamburger.addEventListener(`click`, function (event) {
     event.target.closest('.menu').classList.toggle('menu--active');
   });
  }


});

