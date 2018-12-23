$(document).ready(function() {

  $('.carousel').owlCarousel({
    loop:true,
    margin:5,
    nav:false,
    autoplay: true,
    autoplayTimeout: 9000,
    autoplayHoverPause: true,
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

  //const minusButton = document.querySelectorAll('.counter__minus');
  //const plusButton = document.querySelectorAll('.counter__plus');

  $('.container').on("click", '.content .counter__minus, .content .counter__plus, .products--also .counter__minus, .products--also .counter__plus', counter);

  // if(minusButton && plusButton) {
  //
  //   minusButton.forEach(function(item) {
  //     item.addEventListener(`click`, counter);
  //   });
  //
  //   plusButton.forEach(function(item) {
  //     item.addEventListener(`click`, counter);
  //   });
  //
  // }

  // console.dir(this);
  //
  // if(this.parents('.counter__minus')) {
  //   let input = this.parents('.counter').find('.counter__field');
  //   console.log(input.val());
  // }

  function counter(event) {

    if(event.target.classList.contains('counter__minus')) {
      const input = event.target.parentElement.querySelector('.counter__field');
      const inputHidden = event.target.parentElement.parentElement.querySelector('input[type="hidden"]');

      if(input) {

        if(input.value <= 1) {
          return;
        } else {
          input.value--;

          if(inputHidden) {
            inputHidden.value--;
          }

        }

      }



    } else if(event.target.classList.contains('counter__plus')) {

      const input = event.target.parentElement.querySelector('.counter__field');
      const inputHidden = event.target.parentElement.parentElement.querySelector('input[type="hidden"]');

      if(input) {

        if(input.value >= 99) {
          return;
        } else {
          input.value++;

          if(inputHidden) {
            inputHidden.value++;
          }

        }

      }

    }

  }

  const hamburger = document.querySelector('.menu__hamburger');

  if(hamburger) {
    hamburger.addEventListener(`click`, function (event) {
     event.target.closest('.menu').classList.toggle('menu--active');
   });
  }

  $('.container').on("click", '.button-video', function (e) {
    let id = $(this).attr('data-id');
    $.ajax({
      url: "/wp-admin/admin-ajax.php", //url, к которому обращаемся
      type: "POST",
      data: "action=popup&id=" + id, //данные, которые передаем. Обязательно для action указываем имя нашего хука
      success: function(data){
        //возвращаемые данные попадают в переменную data
        let responseData = jQuery.parseJSON(data);
        $('.popup--video  .popup__wrap').prepend(responseData['meta_value']);
        $('.opacity').addClass('opacity--active');
        $('.popup--video').addClass('popup--active');
      }
    });
  });

  $('.opacity, .popup__close, .button-close').on("click", function (e) {
    $('.opacity').removeClass('opacity--active');
    $('.popup').removeClass('popup--active');
    $('.popup--video  .popup__wrap iframe').remove();
  });


  $('.container').on("click", '.button-cart', function (e) {
    let id = $(this).attr('data-id');
    let count = $('#counter'+id).val();
    $.ajax({
      url: "/wp-admin/admin-ajax.php", //url, к которому обращаемся
      type: "POST",
      data: "action=cart&id="+id+"&count="+count, //данные, которые передаем. Обязательно для action указываем имя нашего хука
      success: function(data){
        //возвращаемые данные попадают в переменную data
        let responseData = jQuery.parseJSON(data);
        $('.popup--product  .popup__wrap p span').html(responseData['post_title']);
        $('.cart__count').html(responseData['count_position']);
        $('.opacity').addClass('opacity--active');
        $('.popup--product').addClass('popup--active');
      }
    });
  });

  $('.table__count .counter__plus, .table__count .counter__minus').on("click", function (e) {
    e.preventDefault();
    counter(e);
    let id = $(this).parents('.table__count').find('input').attr('data-id');
    let value = $(this).parents('.table__count').find('input').val();
    $.ajax({
      url: "/wp-admin/admin-ajax.php", //url, к которому обращаемся
      type: "POST",
      data: "action=update&id="+id+"&value="+value, //данные, которые передаем. Обязательно для action указываем имя нашего хука
      success: function(data){
        let responseData = jQuery.parseJSON(data);
        let updatePrice = responseData['price'] * value;

        let fullSumma = responseData['summa'];

        $('#counter'+id).parents('tr').find('.table__summa span').html(updatePrice + ' руб');
        $('.table__itog span').html('Итого: '+fullSumma+' руб');


        $('.summa'+id).val(responseData['money']);
        $('.itogo').val(fullSumma);

      }
    });

  });

  $('.table__del button').on("click", function (e) {
    e.preventDefault();
    let id = $(this).attr('data-id');

    $.ajax({
      url: "/wp-admin/admin-ajax.php", //url, к которому обращаемся
      type: "POST",
      data: "action=delete&id="+id, //данные, которые передаем. Обязательно для action указываем имя нашего хука
      success: function(data){
        let responseData = jQuery.parseJSON(data);
        let fullSumma = responseData['summa'];

        $('#counter'+id).parents('tr').remove();
        $('.cart__count').html(responseData['count']);
        $('.table__itog span').html('Итого: '+fullSumma+' руб');
        $('.itogo').val(fullSumma);
      }
    });

  });

});

