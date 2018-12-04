$(document).ready(function() {

  $('.carousel').owlCarousel({
    loop:true,
    margin:0,
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

});

