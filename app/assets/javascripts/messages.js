$(document).on('turbolinks:load', function(){
    function buildHTML(message){
    var image = (message.image.url) ? `<img class="message__image" src="${message.image.url}">` :'';

    var html = `<div class="message" data-message_id="${message.id}">
                <div class="message__upper-info">
                  <p class="message__upper-info__talker">
                    ${message.name}
                  </p>
                  <p class="message__upper-info__date">
                    ${message.date}
                  </p>
                </div>
                <p class="message__text">${message.content}</p>
                ${image}
              </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html)
      $('form')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('メッセージを入力してね') //kari
    })
    .always(() => {
      $(".submit-btn").removeAttr("disabled");
    });
  });

  var reloadMessages = function() {
    last_message_id = $('.message:last').data('message_id');
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHtml = '';
      $.each(messages, function(index, message) {
        insertHtml = buildHTML(message);
        $('.messages').append(insertHtml);
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(messages) {
      console.log('error');
    });
  };

  setInterval(reloadMessages, 5000);
});