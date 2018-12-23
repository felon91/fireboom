//обработчик формы Быстрый Звонок
$(document).ready(function(){

  $('.form-order', this).submit(function(){
    //Проверяем, не отправляется ли уже форма в текущий момент времени
    if($(this).data('formstatus') !== 'submitting'){

      //Устанавливаем переменные
      let form = $(this),
          formData = form.serialize(),
          formUrl = form.attr('action'),
          formMethod = form.attr('method');

      //Устанавливаем статус формы
      form.data('formstatus','submitting');

      //Отправляем данные на сервер для проверки
      $.ajax({
        url: formUrl,
        type: formMethod,
        data: formData,
        success:function(data){

          //Устанавливаем переменные
          let responseData = jQuery.parseJSON(data),
              klass = '';

          //Состояния ответа
          switch(responseData.status){
            case 'error':
              klass = 'response-error-site';
              break;
            case 'success':
              klass = 'response-success-site';
              break;
          }


          if (klass == 'response-success-site') {
            //yaCounter28632131.reachGoal('site_order');
            $('.form-error').removeClass('form-error');
            document.forms['order-form'].reset();
            setTimeout(function(){
              document.location.href='https://fireboom.by/thanks/';
            },300);

          } else {

            if(responseData.cls == 'phone') {
              let pos = $('.form input[type="tel"]').offset().top - 100;
              $(document).scrollTop(pos);
              $('.form input[type="tel"]').addClass('form-error');
            } else if (responseData.cls == 'address') {
              let pos = $('#form-address').offset().top - 100;
              $(document).scrollTop(pos);
              $('#form-address').addClass('form-error');
              $('.form input[type="tel"]').removeClass('form-error');
            }

          }

          setTimeout(function(){
            form.data('formstatus','idle');
          },3000);

        }
      });
    }

    //Предотвращаем отправку формы
    return false;
  });

});